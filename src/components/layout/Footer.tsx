export default function Footer() {
  return (
    <footer className="flex justify-center xl:justify-between items-center max-w-full px-14 md:px-20 lg:px-32 xl:px-52 h-40 bg-slate-200">
      <div>
				<div className="text-xl hidden xl:block">LOGO</div>
				<div className="text-sm hidden xl:block">COPYRIGHT C &#40;주&#41;OOO ALL RIGHTS RESERVED.</div>
			</div>
      <div className="footer_con_wrap">
        <div className="flex justify-center xl:justify-end text-sm py-1">
          <div className="mx-1">회사명: OOO</div>
          <div className="mx-1 hidden sm:block">대표자: OOO</div>
        </div>
        <div className="flex justify-center xl:justify-end text-sm py-1">
          <div className="mx-1">전화: 00-000-0000</div>
          <div className="mx-1 hidden sm:block">사업자등록번호 : 000-00-00000</div>
        </div>
        <div className="flex justify-center xl:justify-end text-sm py-1">
          <div className="mx-1">주소 : 서울 특별시 강남구 강남대로</div>
					<div className="mx-1 hidden sm:block">이메일 : email@email.co.kr</div>
        </div>
      </div>
    </footer>
  );
}