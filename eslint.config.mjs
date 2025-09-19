import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Shadcn UI 컴포넌트는 제외
      "src/components/ui/**",
    ],
  },
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "better-tailwindcss": betterTailwindcss,
    },
    rules: {
      // 공백 제거
      "better-tailwindcss/no-unnecessary-whitespace": "warn",

      // 클래스 정렬
      "better-tailwindcss/sort-classes": "warn",

      // 긴 클래스 여러 줄 분할
      "better-tailwindcss/multiline": [
        "warn",
        {
          group: "newLine",
          printWidth: 150,
        },
      ],

      // any 타입 사용 허용
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
