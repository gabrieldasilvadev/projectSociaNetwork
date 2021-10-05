import styled from 'styled-components'

const Box = styled.div`
background-color: rgb(41, 40, 65);
border-radius: 8px;
filter: drop-shadow(2px 2px 2px #111111);

padding: 16px;

margin-bottom: 10px;

.boxLink {
    font-size: 14px;
    color: #2E7BB4;
    text-decoration: none;
    font-weight: 800;
    display: flex;
    justify-content: center;
    align-content: center;
  }
.title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #F1F1F1;
    margin-bottom: 20px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }
  input {
    width: 100%;
    background-color: hsla(261, 95%, 6%, 0.40);
    color: #ffffff;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #cccccc;
      opacity: 1;
    }
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #FFFFFF;
    border-radius: 10000px;
    background-color: #6F92BB;
  }
  .welcomeUser {
    @media (min-width: 860px) {
      display: none;
    }
    display: block;
    font-size: 14px;
    margin-top: 10px;
    color: #2E7BB4;
  }

`;

export default Box;
