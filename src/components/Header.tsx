import { styled } from "styled-components";
interface HeaderProps {
  children: React.ReactNode;
}
export default function Header({ children }: HeaderProps) {
  return <StyledHeader>{children}</StyledHeader>;
}
const StyledHeader = styled.section`
  display: inline-flex;
  height: 50px;
  padding: 4px 6px;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  border-bottom: 1px solid #eaeaea;
`;
