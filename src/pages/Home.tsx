import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>React Home</title>
				<meta name="description" content="메인 페이지의 디스크립션입니다." />
      </Helmet>
      <div className="flex-grow flex max-w-full flex-col py-28 px-14 md:px-20 lg:px-32 xl:px-52 h-40">
        <h1>Home</h1>
      </div>
    </>
  );
}
