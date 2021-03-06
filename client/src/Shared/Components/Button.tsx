import { useApolloClient } from "@apollo/client";
import React from "react";
import Loader from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useData } from "../../Contexts/DataContext";
import { useLogoutMutation } from "../../generated/graphql";
// Types -------------------------------------------------------------------------

interface Props {
  size?: number;
  padding?: number;
  margin?: string;
  disabled?: boolean;
  type: "logout" | "icon" | "login" | "signup" | "submit" | "test";
  reversed?: boolean;
  onClick?: any;
  tabIndex?: number;
}

// Component ---------------------------------------------------------------------
const Button: React.FC<Props> = ({
  onClick,
  reversed,
  disabled,
  type,
  tabIndex,
  children,
}) => {
  const { theme } = useData();
  const [logout] = useLogoutMutation();
  const apollo = useApolloClient();
  const history = useHistory();

  switch (type) {
    case "test":
      return (
        <Test tabIndex={tabIndex} onClickCapture={onClick}>
          {children}
        </Test>
      );
    case "icon":
      return <IconButton>{children}</IconButton>;
    case "login":
      return (
        <Link to="/login">
          <AccoutButton className={reversed ? "reversed" : ""}>
            Log In
          </AccoutButton>
        </Link>
      );
    case "signup":
      return (
        <Link to="/register">
          <AccoutButton className={reversed ? "reversed" : ""}>
            Sign Up
          </AccoutButton>
        </Link>
      );
    case "logout":
      return (
        <AccoutButton
          className={reversed ? "reversed" : undefined}
          onClick={async () => {
            await logout();
            history.go(0);
            // location.reload();

            // await apollo.resetStore();
          }}
        >
          Sign Out
        </AccoutButton>
      );
    case "submit":
      return (
        <SubmitButton disabled={disabled} onClickCapture={onClick}>
          {disabled ? (
            <Loader type="ThreeDots" color={theme?.text} height={8} />
          ) : (
            children
          )}
        </SubmitButton>
      );
    default:
      return null;
  }
};

export default Button;

// Styled ------------------------------------------------------------------------

const IconButton = styled.div`
  display: flex;
  transition: 250ms;
  color: ${({ theme }) => theme.sub};
  cursor: pointer;
  padding: 8px;
  font-size: 12px;
  align-items: center;

  p {
    margin-left: 5px;
  }

  &:hover {
    color: ${(props) => props.theme.text};
  }

  svg {
    min-width: 20px;
    min-height: 20px;
  }
`;

const AccoutButton = styled.button`
  height: 35px;
  padding: 0 20px;
  background: transparent;
  border-radius: 4px;
  color: ${(props) => props.theme.sub};

  &:hover {
    color: ${(props) => props.theme.main};
  }
  &:active {
    background: ${(props) => props.theme.sub};
  }

  &.reversed {
    background: ${(props) => props.theme.main};
    color: ${(props) => props.theme.background};

    &:hover {
      color: ${(props) => props.theme.main};
      background: ${(props) => props.theme.background};
    }

    &:active {
      background: ${(props) => props.theme.sub};
    }
  }
`;

const SubmitButton = styled.button`
  padding: 10px 0;
  width: 100%;
  background: #0000001a;
  color: ${(props) => props.theme.text};
  border-radius: 4px;
  text-align: center;

  &:hover {
    background: ${(props) => props.theme.main};
    color: ${(props) => props.theme.background};
  }
`;

const Test = styled.button`
  display: flex;
  padding: 16px 32px;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  transition: 250ms ease;

  &:hover,
  &:focus {
    color: ${(props) => props.theme.main};
    svg {
      color: ${(props) => props.theme.main};
    }
  }

  &:active,
  &:focus {
    background: ${(props) => props.theme.sub};
  }

  svg {
    transition: 250ms ease;
    height: 20px;
    width: 20px;
    color: ${(props) => props.theme.sub};
  }
`;
