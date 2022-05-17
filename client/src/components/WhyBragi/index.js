import React from "react";
import NavBar2 from "../NavBar2";
import styles from "./WhyBragi.module.css";
function WhyBragi() {
  return (
    <div>
      <NavBar2 />
      <div className={styles.container}>
        <h1 className={styles.firstSubtitle}>HOW IS BRAGI?</h1>
        <h3 className={styles.firstText}>
          Bragi is the god of poetry in Norse mythology. He is the personal poet
          of his father, Odin, lives in Asgard and is considered one of the
          wisest gods, recognised as the god in charge of reciting poems. He is
          also in charge of composing songs and verses in honour of the gods and
          heroes who arrive at Valhalla, where he was sent by his father to
          receive them and offer the toast of welcome. <br />
          He married the goddess Idun (Iðunn), the goddess of youth, who guards
          the fruit consumed by the gods so that they do not grow old. <br />
        </h3>
      </div>
      <div>
        <h1 className={styles.secondSubtitle}>
          <br />
          WHY IS ALWAYS REPRESENTED BY A GOLD HARP?
        </h1>
        <h3 className={styles.secondText}>
          He began making Norse poems and music at a very early age; in fact,
          his first composition was made when he was still a newborn, and it was
          with a magic golden harp that had been given to his father as a gift.
          Since then he has been known as a deity in poetry, and is therefore
          always depicted with a golden harp in his hands. <br />
        </h3>
      </div>

      <div>
        <h1 className={styles.thirdSubtitle}>
          {" "}
          <br />
          WHY BRAGI?
        </h1>
        <h3 className={styles.thirdText}>
          Bragi is associated with bragr, the Norse word for poetry. Just as the
          god Bragi connects his other deities with music and poetry through his
          compositions, the main purpose of the Bragi App is to connect the
          singer with his fans through his music-oriented posts. You can follow
          your favourite artists, see their posts in real time, like them and
          see them on your profile, but above all you can choose to be Premium
          and feel much closer to your favourite singers, commenting on their
          posts and seeing exclusive posts for you.
          <br /> At Bragi we want our users to feel comfortable and for that we
          want to give you the best possible experience, so we ask you to write
          to us if you have any doubts, questions or criticisms. We hope you
          enjoy our website
        </h3>
      </div>
    </div>
  );
}

export default WhyBragi;
