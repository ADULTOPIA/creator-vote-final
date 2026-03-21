import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ffffff);
  padding: 20px;
`;

const Content = styled.div`
  text-align: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #9f2b52;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Message = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ComingSoon: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Content>
        <Title>Creator Vote Final</Title>
        <Message>{t('comingSoon', '決戦開始までお待ちください')}</Message>
        <Spinner />
      </Content>
    </Container>
  );
};

export default ComingSoon;
