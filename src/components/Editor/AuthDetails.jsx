import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleAuthSelector, logout } from "../../features/auth/authSlice";

const AuthModal = ({ user }) => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  if (!user) return;

  return (
    <>
      <div
        className=" bg-gray-800 rounded-lg w-72 absolute top-5 right-5 text-white p-5 flex flex-col justify-center z-30"
        id="auth_modal"
      >
        <img
          src={user.picture}
          alt="user"
          className="rounded-full w-14 h-14 mx-auto"
        />
        <h3 className="text-xl font-semibold my-3 text-center">
          Hi {user.name.split(" ")[0]}!
        </h3>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={handleClick}
        >
          Logout
        </button>
      </div>
    </>
  );
};

const AuthDetails = ({ className }) => {
  const user = useSelector((state) => googleAuthSelector(state.auth));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleClick = (event) => {
      const isOutsideComponent = !event.target.closest("#auth_modal");

      if (isOutsideComponent) {
        setIsAuthModalOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setIsAuthModalOpen]);

  const openAuthModal = useCallback(
    (e) => {
      e.stopPropagation();

      setIsAuthModalOpen(true);
    },
    [setIsAuthModalOpen]
  );

  if (!user) return null;

  return (
    <>
      <button className={` ${className}`} onClick={openAuthModal}>
        <img src={user.picture} alt="user" className="rounded-full w-6 h-6" />
      </button>
      {isAuthModalOpen && <AuthModal user={user} />}
    </>
  );
};

export default AuthDetails;
