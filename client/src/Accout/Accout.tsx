import React from "react";
import Loader from "react-loader-spinner";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../Contexts/AuthContext";
import { useData } from "../Contexts/DataContext";
import { useStatsQuery } from "../generated/graphql";
import Layout from "../Shared/Components/Layout";
import { date } from "../Shared/utils/date";
import { f, r } from "../Shared/utils/number";
import ResultTable from "../TypingGame/ResultTable";
import History from "./History";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Account: React.FC<Props> = () => {
  const { user } = useAuth();
  const { data, loading, error } = useStatsQuery();
  const { theme } = useData();

  if (user === null) return <Redirect to="/" />;

  if (loading)
    return (
      <Layout center>
        <Loader type="ThreeDots" color={theme.main} height={12} />
      </Layout>
    );
  else if (!data) throw new Error(error?.message);
  const { stats } = data;

  return (
    <Layout>
      <Wrapper>
        <StatsHeader>
          <div>
            <Text>tests completed</Text>
            <BigText>{stats.testsCompleted}</BigText>
          </div>
          <div>
            <Text>average wpm</Text>
            <BigText>{r(stats.averageWpm)}</BigText>
          </div>
          <div>
            <Text>time playing</Text>
            <BigText>{stats.timePlayed}</BigText>
          </div>
        </StatsHeader>
        {/* table */}
        <ResultTable data={stats.personalBests} title="personal bests" />
        {/*  */}
        <OtherStats>
          {/* wpm */}
          <div>
            <Text>highest wpm</Text>
            <BigText>{f(stats.highestWpm)}</BigText>
          </div>
          <div>
            <Text>average wpm</Text>
            <BigText>{r(stats.averageWpm)}</BigText>
          </div>
          <div>
            <Text>
              average wpm
              <br />
              (last 10 tests)
            </Text>
            <BigText>{r(stats.last10AverageWpm)}</BigText>
          </div>
          {/* raw */}
          <div>
            <Text>highest raw wpm</Text>
            <BigText>{f(stats.highestRaw)}</BigText>
          </div>
          <div>
            <Text>average raw wpm</Text>
            <BigText>{r(stats.averageRaw)}</BigText>
          </div>
          <div>
            <Text>
              average raw wpm
              <br />
              (last 10 tests)
            </Text>
            <BigText>{r(stats.last10AverageRaw)}</BigText>
          </div>
          {/* accuracy */}
          <div>
            <Text>time playing</Text>
            <BigText>{stats.timePlayed}</BigText>
          </div>
          <div>
            <Text>average accuracy</Text>
            <BigText>{r(stats.averageAcc)}%</BigText>
          </div>
          <div>
            <Text>
              average accuracy
              <br />
              (last 10 tests)
            </Text>
            <BigText>{r(stats.last10AverageAcc)}%</BigText>
          </div>
        </OtherStats>
        <History />
      </Wrapper>
    </Layout>
  );
};

export default Account;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  color: ${(props) => props.theme.text};
`;

const StatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 75px;
`;

const OtherStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: space-between;
  row-gap: 15px;
  padding-right: 150px;
`;

const Text = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.sub};
`;

const BigText = styled.p`
  line-height: 50px;
  font-size: 48px;
`;
