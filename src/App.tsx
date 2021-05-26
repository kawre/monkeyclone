import { Route, Switch } from "react-router";
import styled from "styled-components";
import AddQuote from "./AddQuote/AddQuote";
import { AuthProvider } from "./Contexts/AuthContext";
import { DataProvider } from "./Contexts/DataContext";
import Header from "./Shared/Components/Header";
import LoginForm from "./Shared/Forms/LoginForm";
import RegisterForm from "./Shared/Forms/RegisterForm";
import { colors } from "./Shared/Global/Colors";
import TypingGame from "./TypingGame/TypingGame";

const App = () => {
  return (
    <AuthProvider>
      <Wrapper>
        <Header />
        <DataProvider>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/add-quote" component={AddQuote} />
            <Route exact path="/" component={() => <TypingGame />} />
          </Switch>
        </DataProvider>
      </Wrapper>
    </AuthProvider>
  );
};

export default App;

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  color: ${colors.text};
`;
