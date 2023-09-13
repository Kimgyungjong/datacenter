def isDeployedWithECS(branch) {
  return branch ==~ "main"
}

pipeline {
  agent any
  stages {
    stage('Start pipeline') {
      steps {
        slackSend(
          channel: "${SLACK_CHANNEL}",
          color: '#50bcdf',
          message: "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
        )
      }
    }
    stage('List all environment variables') {
      steps {
        echo sh(script: 'env|sort', returnStdout: true)
      }
    }
    stage ("Update submodules") {
      when {
        expression{isDeployedWithECS(env.BRANCH_NAME)}
      }
      steps {
        withCredentials([gitUsernamePassword(credentialsId: "AlcheraTD", gitToolName: "git-tool")]) {
          sh "git submodule update --init --recursive"
        }
      }
    }
    stage('Build') {
      steps {
        script {
          if (!isDeployedWithECS(env.BRANCH_NAME)) {
            if (env.BRANCH_NAME == 'develop') {
              BUILD_ENV="dev"
            } else if (env.BRANCH_NAME == 'active') {
              BUILD_ENV="active"
            } else {
              throw new Exception("Invalid branch (${env.BRANCH_NAME})")
            }

            sh "npm install && CI=false npm run build"
          } else {
              RESOLVER_URL='164.10.0.2'
              APP_API_PROXY_URL='https://drive.treed.ai:8443'
              BUILD_ENV = "production"

            sh "docker build \
                  --build-arg RESOLVER_URL=${RESOLVER_URL} \
                  --build-arg BUILD_ENV=${BUILD_ENV} \
                  --build-arg APP_API_PROXY_URL=${APP_API_PROXY_URL} \
                  --build-arg VERSION_INFO=${TAG_NAME} \
                  -t $LOCAL_IMAGE_NAME ."
          }
        }
      }
    }
    stage('Deploy') {
      steps([$class: 'BapSshPromotionPublisherPlugin']) {
        script {
          if (!isDeployedWithECS(env.BRANCH_NAME)) {
            if (env.BRANCH_NAME == 'develop') {
              SSH_CONFIG_NAME="treed-data-center-dev"
            } else if (env.BRANCH_NAME == 'active') {
              SSH_CONFIG_NAME="treed-data-center-active"
            } else {
              throw new Exception("Invalid branch (${env.BRANCH_NAME})")
            }

            sshPublisher(
              continueOnError: false, failOnError: true,
              publishers: [
                sshPublisherDesc(
                  configName: "${SSH_CONFIG_NAME}",
                  verbose: true,
                  transfers: [
                    sshTransfer(
                        cleanRemote: true,
                        sourceFiles: "build/**/*",
                        removePrefix: "build",
                        remoteDirectory: "view",
                        execCommand: "sudo service nginx reload"
                    )
                  ]
                )
              ]
            )
          } else {
            ECR_IMAGE_NAME="td-data-center-stable-front"
            ECS_CLUSTER="Td-Data-Center-Stable-Cluster"
            ECS_SERVICE="Td-Data-Center-Stable-Front-Service"
            ECS_TASK="Td-Data-Center-Stable-Front-Task"
            SERVICE_COUNT="1"
            ECR_IMAGE_TAG="${env.BUILD_NUMBER}.${DOCKER_BUILD_DATE}.${SHORT_COMMIT_ID}"

            sh "alcherads-aws-scripts/push_image2ecr.sh --local_image_name=${LOCAL_IMAGE_NAME} --ecr_image_name=${ECR_IMAGE_NAME} --ecr_image_tag=${ECR_IMAGE_TAG}"
            sh "alcherads-aws-scripts/deploy_service2ecs.sh --ecr_image_name=${ECR_IMAGE_NAME} --ecr_image_tag=${ECR_IMAGE_TAG} \
              --ecs_cluster=${ECS_CLUSTER} --ecs_service=${ECS_SERVICE} --ecs_task=${ECS_TASK} --service_count=${SERVICE_COUNT}"
         }
        }
      }
    }
  }
  post {
    success {
      slackSend(
        channel: "${SLACK_CHANNEL}",
        color: 'good',
        message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
      )
    }
    failure {
      slackSend(
        channel: "${SLACK_CHANNEL}",
        color: 'danger',
        message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
      )
    }
  }
  environment {
    SLACK_CHANNEL = '#td-data-center-noti'

    PROJECT_NAME = 'DataCenterFront'
    REMOTE_DIR = '/home/alchera/dataCenter'

    LOCAL_IMAGE_NAME="dataCenter-frontend"
    DOCKER_BUILD_DATE=sh(returnStdout: true, script: "date +%m%d%y").trim()
    SHORT_COMMIT_ID=sh(returnStdout: true, script: "git rev-parse --short HEAD").trim()
  }
}
