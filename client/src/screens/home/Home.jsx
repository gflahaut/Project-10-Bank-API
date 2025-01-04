import React from "react";
import styles from "./Home.module.css";
import Banner from "../../components/banner/Banner";
import Nav from "../../components/nav/Nav";
import Feature from "../../components/feature/Feature";
import Footer from "../../components/footer/Footer";

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Banner />
        <section className={styles.features}>
          <h2 className="srOnly">Features</h2>
          <Feature
            image="/assets/img/icon-chat.png"
            title="You are our #1 priority"
            text="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
          />
          <Feature
            image="/assets/img/icon-money.png"
            title="More savings means higher rates"
            text="The more you save with us, the higher your interest rate will be!"
          />
          <Feature
            image="/assets/img/icon-security.png"
            title="Security you can trust"
            text="We use top of the line encryption to make sure your data and money is always safe."
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
