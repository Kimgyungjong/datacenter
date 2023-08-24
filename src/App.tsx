import { BrowserRouter } from "react-router-dom";
import Router from "@src/routes/router"; // 라우터 컴포넌트 가져오기

const App: React.FC = () => {
  return (
    <div className="App text-mono-black">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
};

export default App;
