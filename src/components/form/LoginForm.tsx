import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import Accounts from "@/data/Accounts.json";
import { useUserStore } from "@/store/UserState";

export default function Login() {
  // react-query로 로그인 상태관리 하는 것은 다음번에 도전해보겠습니다.
  // 일단 zustand로 로그인 상태관리를 해보겠습니다.
  const { login, logout, user } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // console.log("로그인 시도:", data);
    // json 데이터를 가져와서 해당하는 이메일과 비밀번호가 맞는지 확인합니다.
    const account = Accounts.find(
      (account) =>
        account.email === data.email && account.password === data.password,
    );
    if (account) {
      alert("로그인 성공!");
      login();
    } else {
      alert("로그인 실패!");
    }
  };

  if (user) {
    return (
      <div className="flex flex-col w-full max-w-[600px]">
        <div className="flex justify-center mb-3">로그인 되었습니다.</div>
        <button
          className="p-5 mt-5 flex items-center justify-center bg-slate-300"
          onClick={logout}>
          로그아웃 하기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-[600px]">
      <div className="flex justify-center">
        <div className="text-3xl">로그인</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col">
          <label className="py-2" htmlFor="email">
            이메일
          </label>
          <Input
            className="p-3 border border-solid border-gray-300 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            type="email"
            placeholder="이메일"
            {...register("email", {
              required: "이메일을 입력해주세요!",
              minLength: {
                value: 4,
                message: "최소 4글자를 입력해주세요",
              },
              maxLength: {
                value: 15,
                message: "15글자를 초과할 수 없습니다",
              },
            })}
          />
          {errors?.email?.message && (
            <Label className=" text-red-600">
              {errors?.email?.message as React.ReactNode}
            </Label>
          )}
        </div>
        <div className="flex flex-col">
          <label className="py-2" htmlFor="password">
            비밀번호
          </label>
          <Input
            className="p-3 border border-solid border-gray-300 focus:border-gray-500"
            type="password"
            placeholder="비밀번호"
            {...register("password", {
              required: "비밀번호를 입력해주세요!",
              minLength: {
                value: 6,
                message: "최소 6글자를 입력해주세요",
              },
            })}
          />
          {errors?.password?.message && (
            <Label className=" text-red-600">
              {errors?.password?.message as React.ReactNode}
            </Label>
          )}
        </div>
        <button
          type="submit"
          className="p-5 mt-5 flex items-center justify-center bg-slate-300">
          로그인
        </button>
      </form>
    </div>
  );
}
