import { G1, G10, G5, GOpenDay } from './images';
import { call_icon, explore_icon, hand_raise_icon } from './icons/inex';

export const Games = [
  {
    src: GOpenDay,
    title: 'باقة تتيح لك إنشاء لعبة واحدة',
    price: 1,
    discount: 0,
  },
  {
    src: G1,
    title: 'باقة تتيح لك إنشاء لعبتين',
    price: 1.5,
    discount: 0,
  },
  {
    src: G5,
    title: 'باقة تتيح لك إنشاء 5 ألعاب',
    price: 6,
    discount: 23,
  },
  {
    src: G10,
    title: 'باقة تتيح لك إنشاء 10 ألعاب',
    price: 1,
    discount:0,
  },
];

export const helpingData = [
  {
    title: 'تصميم اللعبة',
    description: `!احفر لهم
جاوب صح، و اخصم عدد النقاط اللي فزت فيها من نقاط الفريق الثاني`,
    icon: explore_icon,
    bgColor: 'yellow',
  },
  {
    title: 'جاوب جوابين',
    description: `!متردد بجوابين؟ هذي لك
جاوب بالأثنين عشان تضمن النقاط`,
    icon: hand_raise_icon,
  },
  {
    title: 'ادبلها!',
    description: `ادبل النقاط قبل ما تشوف السؤال`,
    icon: call_icon,
  },
];
