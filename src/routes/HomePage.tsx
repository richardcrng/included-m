import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonImg,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import styled from "styled-components";
import SwipeableViews from "react-swipeable-views";
import { DEFAULT_COURSE_ID, INCLUDED_VC_LOGO } from "../constants";
import creandum from "../assets/partners/creandum-logo.png";
import daphni from "../assets/partners/daphni-logo.png";
import enern from "../assets/partners/enern-logo.png";
import kFund from "../assets/partners/k-fund-logo.png";
import m12 from "../assets/partners/m12-logo.png";
import mangrove from "../assets/partners/mangrove-capital-partners-logo.png";
import mouro from "../assets/partners/mouro-capital-logo.png";
import notion from "../assets/partners/notion-logo.png";
import seedcamp from "../assets/partners/seedcamp-logo.png";
import wilsonSonsini from "../assets/partners/wilson-sonsini-logo.png";

const Logo = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: min(250px, 30vw);
  height: 100%;
`;

const SlideBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Callout = styled.div`
  margin: 1rem 0;

  display: flex;
  justify-content: center;

  p {
    font-size: 16px;
    text-align: left;
  }

  span {
    margin-right: 0.5rem;
  }
`;

const partnerLogoSrcs = [
  notion,
  daphni,
  seedcamp,
  m12,
  mouro,
  enern,
  creandum,
  wilsonSonsini,
  kFund,
  mangrove,
];

function ImageRow({ indices }: { indices: number[] }) {
  return (
    <IonRow>
      {indices.map((idx) => (
        <IonCol key={idx}>
          <Logo>
            <IonImg src={partnerLogoSrcs[idx]} />
          </Logo>
        </IonCol>
      ))}
    </IonRow>
  );
}

function HomePage() {
  return (
    <>
      <IonToolbar>
        <div
          style={{
            display: "flex",
          }}
        >
          <IonImg
            src={INCLUDED_VC_LOGO}
            style={{
              maxWidth: "300px",
              maxHeight: "100px",
              padding: "1rem",
              display: "inline-block",
              margin: "auto",
            }}
          />
        </div>
      </IonToolbar>
      <IonContent className="ion-padding">
        <SwipeableViews enableMouseEvents>
          <SlideBody>
            <h1>Learn venture, for free</h1>
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>
                  Venture capital is <i>now open</i>.
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p style={{ fontSize: "16px" }}>
                    Included M is a <b>fully open-source</b> learning pathway in
                    venture capital.
                  </p>
                  <Callout>
                    <div>
                      <p>
                        <span>🔑</span> Anyone can sign up
                      </p>
                      <p style={{ fontSize: "16px", textAlign: "left" }}>
                        <span>📲</span> Learn on the go
                      </p>
                      <p style={{ fontSize: "16px", textAlign: "left" }}>
                        <span>♾️</span> Free forever
                      </p>
                    </div>
                  </Callout>
                  <p>
                    Brought to life by{" "}
                    <a href="https://included.vc" target="_blank">
                      Included VC
                    </a>
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </SlideBody>
          <SlideBody>
            <h1>Supported by leading funds</h1>
            <IonCard>
              {/* <IonCardHeader style={{ paddingBottom: "0" }}>
                  <IonCardSubtitle>Included VC Partners:</IonCardSubtitle>
                </IonCardHeader> */}
              <IonGrid>
                <ImageRow indices={[0, 1, 2]} />
                <ImageRow indices={[3, 4, 5]} />
                <ImageRow indices={[6, 7, 8]} />
                <ImageRow indices={[10, 9, 11]} />
              </IonGrid>
            </IonCard>
          </SlideBody>
          <SlideBody>
            <h1>Change the face of venture</h1>
            <IonCard>
              <IonCardContent>
                <p>
                  The Included VC mission is to{" "}
                  <b>change the face of the VC industry</b>.
                </p>
                <br />
                <p>
                  That's why we built{" "}
                  <a href="https://included.vc" target="_blank">
                    a fully-funded Fellowship
                  </a>
                  . Now,{" "}
                  <b>
                    we're opening up our knowledge to <i>everyone</i>
                  </b>{" "}
                  and <i>anyone</i>
                  with a phone and internet.
                </p>
              </IonCardContent>
            </IonCard>
          </SlideBody>
        </SwipeableViews>
      </IonContent>
      <IonFooter className="ion-no-border" style={{ backgroundColor: "white" }}>
        <IonButton routerLink={`/course/${DEFAULT_COURSE_ID}`} expand="full">
          Start
        </IonButton>
      </IonFooter>
    </>
  );
}

export default HomePage;
