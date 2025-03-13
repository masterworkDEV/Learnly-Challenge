const MissingPage = () => {
  return (
    <>
      <p>Ooops cannot fine the page you're looking for ??</p>
      <p onClick={(window.location.href = "/user-profile")}>Go back home</p>
    </>
  );
};

export default MissingPage;
