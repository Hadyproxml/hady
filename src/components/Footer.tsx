/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-900 py-12 px-6 md:px-12 lg:px-20 border-t border-slate-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-100">
            A
          </div>
          <div className="text-right">
            <h3 className="font-bold text-lg">د. محمد عفاره</h3>
            <p className="text-slate-400 text-xs">أخصائي أمراض الكلى والباطنة العامة</p>
          </div>
        </div>
        
        <div className="text-slate-400 text-sm text-center md:text-right leading-relaxed">
          <p dir="rtl">© {new Date().getFullYear()} جميع الحقوق محفوظة لعيادة د. محمد عفاره التخصصية</p>
          <p className="mt-1">تصميم تقني متطور لضمان راحة وسلامة المرضى</p>
        </div>
      </div>
    </footer>
  );
}
