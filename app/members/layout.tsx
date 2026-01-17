import { GoogleAnalytics } from '@next/third-parties/google';
import Sheet from '@/app/_components/Sheet';
import Hero from '@/app/_components/Hero';

export const metadata = {
  title: 'メンバー',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
  <Hero title="Self Introduction" sub="自己紹介" />
      <Sheet>{children}</Sheet>
      <GoogleAnalytics gaId="G-XXX" />
    </>
  );
}
