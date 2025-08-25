"use client";
import { clientSessionToken } from "@/lib/http";
import { useLayoutEffect, useState } from "react";

export default function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  //chạy trước useEffect nhưng cách useLayoutEffect, thì sessionToken.value sẽ chỉ được gán sau khi render → trong render đầu tiên các component khác có thể thấy token chưa có.
  // useLayoutEffect(() => {
  //   sessionToken.value = initialSessionToken;
  // }, [initialSessionToken]);

  // Giá trị initialValue được dùng ngay trong lần render đầu tiên.
  // Không cần đợi component render xong mới gán giá trị
  useState(() => {
    //thực hiện ở client
    if (typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken;
    }
  });

  return <>{children}</>;
}

// // 1. Tạo Context
// const AppContext = createContext<{
//   sessionToken: string;
//   setSessionToken: (sessionToken: string) => void;
// } | null>(null);

// // 2. Custom hook để dùng Context dễ dàng
// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAppContext must be used within an AppProvider");
//   }
//   return context;
// };

// // 3. Provider cung cấp dữ liệu cho toàn bộ ứng dụng
// export default function AppProvider({
//   children,
//   initialSessionToken = "",
// }: {
//   children: React.ReactNode;
//   initialSessionToken?: string;
// }) {
//   const [sessionToken, setSessionToken] = useState(initialSessionToken);

//   return (
//     <AppContext.Provider value={{ sessionToken, setSessionToken }}>
//       {children}
//     </AppContext.Provider>
//   );
// }
