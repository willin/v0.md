import { redirect } from 'next/navigation';

/**
 * 根目录 404 - 重定向到默认语言（中文）首页
 * 因为这是一个多语言应用，所有页面都应该在 /[locale] 路径下
 */
export default function RootNotFound() {
  redirect('/zh');
}
