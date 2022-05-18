import React from "react";
import NavBar2 from "../NavBar2";
import styles from "./WhyBragi.module.css";
function WhyBragi() {
  return (
    <div>
      <NavBar2 />
      <div className={styles.container}>
        <h1 className={styles.firstSubtitle}>WHO IS BRAGI?</h1>
        <div className={styles.textAndImg1}>
          <h3 className={styles.firstText}>
            Bragi is the god of poetry in Norse mythology. He is the personal
            poet of his father, Odin, lives in Asgard and is considered one of
            the wisest gods, recognised as the god in charge of reciting poems.
            He is also in charge of composing songs and verses in honour of the
            gods and heroes who arrive at Valhalla, where he was sent by his
            father to receive them and offer the toast of welcome. <br />
            He married the goddess Idun (Iðunn), the goddess of youth, who
            guards the fruit consumed by the gods so that they do not grow old.{" "}
            <br />
          </h3>
          <img
            className={styles.img1}
            src="https://3.bp.blogspot.com/-sT-lhhVDWw8/UkpjfCrseOI/AAAAAAAAEYU/x9K4KvFZeE0/s1600/Bragi_by_Asfodelo.jpg"
            alt="img"
          />
        </div>
      </div>
      <div>
        <h1 className={styles.secondSubtitle}>
          <br />
          WHY IS HE ALWAYS DEPICTED BY A GOLD HARP?
        </h1>
        <div className={styles.textAndImg2}>
          <img
            className={styles.img2}
            src="data:image/jpeg;base64,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"
            alt="logo"
          />
          <h3 className={styles.secondText}>
            He began making Norse poems and music at a very early age; in fact,
            his first composition was made when he was still a newborn, and it
            was with a magic golden harp that had been given to his father as a
            gift. Since then he has been known as a deity in poetry, and is
            therefore always depicted with a golden harp in his hands. <br />
          </h3>
        </div>
      </div>
      <div>
        <h1 className={styles.thirdSubtitle}>
          {" "}
          <br />
          WHY BRAGI?
        </h1>
        <div className={styles.textAndImg3}>
          <h3 className={styles.thirdText}>
            Bragi is associated with bragr, the Norse word for poetry. Just as
            the god Bragi connects his other deities with music and poetry
            through his compositions, the main purpose of the Bragi App is to
            connect the singer with his fans through his music-oriented posts.
            You can follow your favourite artists, see their posts in real time,
            like them and see them on your profile, but above all you can choose
            to be Premium and feel much closer to your favourite singers,
            commenting on their posts and seeing exclusive posts for you.
            <br /> At Bragi we want our users to feel comfortable and for that
            we want to give you the best possible experience, so we ask you to
            write to us if you have any doubts, questions or criticisms. We hope
            you enjoy our website
          </h3>
          <img
            className={styles.img3}
            src="https://i.imgur.com/Nwm2bfo.png"
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}

export default WhyBragi;
