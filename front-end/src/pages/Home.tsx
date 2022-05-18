import styled, { keyframes } from "styled-components";

//animation frames
const JumpKeyFrame = (lower: number, high: number) => keyframes`
0%   { bottom: ${lower}px; }
100% { bottom: ${high}px; }
`;

const BorderKeyFrame = (width: number) => keyframes`
  0% {clip: rect(0px, 100px, 500px, 0px); }
  100% {clip: rect(0px, ${width + 100}px, 500px, ${width}px); }
`;

const ShadowKeyFrame = keyframes`
  0% { box-shadow: 0px 0px 0px 0px red; }
  100% { box-shadow: 0px 0px 80px 12px red; }
`;

const FlyKeyFrame = keyframes`
  0% {transform: matrix(0.43, 0.81, -1.09, 0.19, 0, 0);}
  100% {transform: matrix(0.43, 0.81, -1.09, 0.29, 0, 0);}
`;

const BackManKeyFrame = keyframes`
  0% {bottom: -100px; opacity: 0.3; }
  10% {bottom: -100px; opacity: 0.8; }
  20% {bottom: -100px; opacity: 0.3; }
  30% {bottom: -100px; opacity: 0.8; }
  50% {bottom: -150px; opacity: 0.8; }
  60% {bottom: -120px; opacity: 0.8; }
  70% {bottom: -150px; opacity: 0.8; }
  80% {bottom: -120px; opacity: 0.8; }
  90% {bottom: -150px; opacity: 0.8; }
  100% {bottom: -150px; opacity: 0.1; }
`;

// components
const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: url("/assets/image/home-back1.png");
  background-size: 100% 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 150px;
  padding-bottom: 100px;
  box-sizing: border-box;
`;

const TitlePart = styled.div`
  width: 50%;
  margin: 0px;
  margin-left: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  font-family: "Londrina Solid";
  font-style: normal;

  color: #ffffff;
  font-weight: 400;
  text-transform: uppercase;

  h5 {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;

    text-transform: uppercase;
    margin: 0px;
  }
  h1 {
    font-size: 60px;
    line-height: 68px;
    letter-spacing: 2px;
    margin: 10px 0px;
  }
  p {
    font-weight: 300;
    font-size: 12px;
    line-height: 26px;
    letter-spacing: 1px;
    text-transform: capitalize;
    margin: 0px;
  }
`;

const RedSpane = styled.span`
  color: red;
`;

const HomeMan = styled.img`
  position: absolute;
  width: 400px;
  right: 95px;
  animation: ${JumpKeyFrame(7, 40)} 1s ease-in-out infinite alternate;
`;

const AboutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Londrina Solid";
  font-style: normal;
  text-align: center;
  color: white;
  padding: 40px 0px;
  position: relative;
  background-color: transparent;
  h5 {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;

    text-transform: uppercase;
    margin: 0px;
  }
  h1 {
    font-size: 60px;
    line-height: 68px;
    letter-spacing: 2px;
    margin: 10px 0px;
  }
  p {
    font-weight: 300;
    font-size: 12px;
    line-height: 26px;
    letter-spacing: 1px;
    text-transform: capitalize;
    margin: 0px;
    width: 40%;
  }
`;

const BB = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: transparent;
  color: white;
  box-shadow: inset 0 0 0 1px rgba(white, 0.5);

  &::after {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: "";
    margin: -2px;
    box-shadow: inset 0 0 0 2px;
    animation: ${BorderKeyFrame(900)} 2s ease-in-out infinite alternate;
    border-radius: 150px;
  }
`;

const AboutBox = styled.div`
  margin: 100px 200px 100px 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 150px;
  padding: 40px 100px 40px 300px;
  border: 1px solid #ff3838;
  position: relative;
  background-color: transparent;
  animation: ${ShadowKeyFrame} 2s ease-in-out infinite alternate;

  h4 {
    font-size: 24px;
    line-height: 40px;
    letter-spacing: 1px;
    text-transform: uppercase;

    color: #ff3232;
    margin: 0px;
  }
  p {
    font-weight: 300;
    font-size: 12px;
    line-height: 20px;
    /* or 153% */

    letter-spacing: 1px;
    text-transform: capitalize;
    text-align: left;
    width: 100%;
    margin: 0px;
  }
`;

const FlyPane = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 320px;
  height: 230px;
  bottom: 20px;
  left: -60px;

  background: #d62d3a;
  border-radius: 90px;
  animation: ${FlyKeyFrame} 2s ease-in-out infinite alternate;
`;

const AboutUsMan = styled.img`
  position: absolute;
  width: 350px;
  left: -40px;
  animation: ${JumpKeyFrame(17, 50)} 2s ease-in-out infinite alternate;
`;

const BackMan1 = styled.img`
  width: 300px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0px);
  animation: ${BackManKeyFrame} 5s linear infinite;
  z-index: 0;
`;

const TrendingContainer = styled.div`
  width: 100%;
  background-color: transparent;
  background-image: url("/assets/image/home-back2.png");
  background-size: 100%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding-top: 250px;

  h5 {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;

    text-transform: uppercase;
    margin: 0px;
  }
  h1 {
    font-size: 60px;
    line-height: 68px;
    letter-spacing: 2px;
    margin: 10px 0px;
    text-transform: uppercase;
  }
  p {
    font-weight: 300;
    font-size: 12px;
    line-height: 26px;
    letter-spacing: 1px;
    text-transform: capitalize;
    margin: 0px;
    width: 40%;
    text-align: center;
  }
`;

const Home = () => {
  return (
    <>
      <HomeContainer>
        <TitlePart>
          <h5>Dokesi is a PFP for short film animation.</h5>
          <h1>
            discover best <RedSpane>digital art</RedSpane> and collect nfts
          </h1>
          <p>
            This is the lair of the faceless spirit skulls. The more time you
            spend here, the more thrilling your experience will be
          </p>
        </TitlePart>
        <HomeMan src="/assets/image/home-man1.png" />
      </HomeContainer>
      <AboutContainer>
        <h5>
          <RedSpane>About US</RedSpane>
        </h5>
        <h1>About dokesi.io</h1>
        <p>
          This is the lair of the faceless spirit skulls. The more time you
          spend here, the more thrilling your experience will be
        </p>
        <AboutBox>
          <h4>
            <RedSpane>dokesi.io</RedSpane>
          </h4>
          <p>
            Dokesi is a PFP designed for short film animation. It launches 6,668
            independent digital NFT collections on Solana blockchain, with rich,
            diverse and unique rare features, dozens of rare headshots, costumes
            and color schemes. We started with 6,668 PFP, and the world of
            Dokesi is constantly expanding. The new experience of Dokesi is only
            open to holders. With the expansion of the universe, our brand is
            constantly developing.
          </p>
          <BB />
          <FlyPane />
          <AboutUsMan src="/assets/image/home-man2.png" />
        </AboutBox>
        <BackMan1 src="/assets/image/home-back-man1.png" />
      </AboutContainer>
      <TrendingContainer>
        <h5>About US</h5>
        <h1>
          Treanding <RedSpane>this week</RedSpane>
        </h1>
        <p>
          This is the lair of the faceless spirit skulls. The more time you
          spend here, the more thrilling your experience will be
        </p>
      </TrendingContainer>
    </>
  );
};

export default Home;
