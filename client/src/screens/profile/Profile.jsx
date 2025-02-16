import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../stores/slices/user.slice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);

  const accounts = [
    {
      name: "Argent Bank Checking",
      accountNumber: "x8349",
      balance: "2,082.79",
      description: "Available Balance",
    },
    {
      name: "Argent Bank Savings",
      accountNumber: "x6712",
      balance: "10,928.42",
      description: "Available Balance",
    },
    {
      name: "Argent Bank Credit Card",
      accountNumber: "x8349",
      balance: "184.30",
      description: "Current Balance",
    },
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [tempFirstName, setTempFirstName] = useState("");
  const [tempLastName, setTempLastName] = useState("");
 
  useEffect(() => {
    if (loading) return;
    if (!user || !user.infos) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && user.infos) {
      setTempFirstName(user.infos.firstName);
      setTempLastName(user.infos.lastName);
    }
  }, [user]);

  const handleEditClick = () => {
    setTempFirstName(user.infos.firstName);
    setTempLastName(user.infos.lastName);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(updateUser({ firstName: tempFirstName, lastName: tempLastName }))
      .unwrap()
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Failed to update user:", error);
      });
  };

  const handleCancelClick = () => {
    setTempFirstName(user.infos.firstName);
    setTempLastName(user.infos.lastName);
    setIsEditing(false);
  };

  if (loading || !user || !user.infos) return "<p>Loading...</p>"; 

  return (
    <>
      <Nav />
      <main className={`${styles.main} ${styles.bgDark}`}>
        <div className={styles.welcome}>
          {isEditing ? (
            <>
              <h1> Welcome back</h1>
              <div className={styles.editForm}>
                <input
                  type="text"
                  value={tempFirstName}
                  onChange={(e) => setTempFirstName(e.target.value)}
                  className={styles.inputFirstName}
                />
                <input
                  type="text"
                  value={tempLastName}
                  onChange={(e) => setTempLastName(e.target.value)}
                  className={styles.inputLastName}
                />
                <button onClick={handleSaveClick} className={styles.saveButton}>
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                {error && isEditing && (
                  <p className={styles.errorMessage}>{error}</p>
                )}
              </div>
            </>
          ) : (
            <>
              <h1>
                Welcome back <br /> {user.infos.firstName} {user.infos.lastName} !
              </h1>
              <button onClick={handleEditClick} className={styles.editButton}>
                Edit Name
              </button>
            </>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        {accounts.map((account, index) => (
          <section className={styles.account} key={index}>
            <div className={styles.accountContentWrapper}>
              <h3 className={styles.accountTitle}>
                {account.name} ({account.accountNumber})
              </h3>
              <p className={styles.accountAmount}>${account.balance}</p>
              <p className={styles.accountAmountDescription}>
                {account.description}
              </p>
            </div>
            <div className={`${styles.accountContentWrapper} ${styles.cta}`}>
              <button className={styles.transactionButton}>
                View transactions
              </button>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
};

export default Profile;
