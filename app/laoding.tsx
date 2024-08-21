import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  border: 4px solid #cc9900;
  border-top-color: #ffcc33;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  background-color: #f0f0f0;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3),
              -5px -5px 10px rgba(255, 255, 255, 0.3);
`;

export default function Loading() {
    return (
        <LoadingContainer>
            <LoadingSpinner />
        </LoadingContainer>
    );
}