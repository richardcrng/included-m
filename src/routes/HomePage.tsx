import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import styled from "styled-components";
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
        <div>
          <IonImg
            src={INCLUDED_VC_LOGO}
            style={{
              maxWidth: "300px",
              padding: "1rem",
              display: "inline-block",
            }}
          />
        </div>
      </IonToolbar>
      <IonContent className="ion-padding">
        <h1>Learn venture for free with leading funds</h1>
        <p>
          <b>
            Venture capital is <s>inaccessible</s> <i>now open</i>.
          </b>
        </p>
        <p>
          Included M is a fully open-source learning pathway created by{" "}
          <a href="https://included.vc" target="_blank">
            Included VC
          </a>
          .
        </p>
        <p>
          We run a global Fellowship that's free for all participants,
          fully-funded by our supporters:
        </p>
        <IonGrid>
          <ImageRow indices={[0, 1, 2]} />
          <ImageRow indices={[3, 4, 5]} />
          <ImageRow indices={[6, 7, 8]} />
          <ImageRow indices={[10, 9, 11]} />
        </IonGrid>
        <IonButton routerLink={`/course/${DEFAULT_COURSE_ID}`} expand="full">
          Start
        </IonButton>
      </IonContent>
    </>
  );
}

export default HomePage;
