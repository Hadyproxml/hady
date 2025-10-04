import { Authenticated, Unauthenticated, useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster, toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import { Id } from "../convex/_generated/dataModel";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b sticky top-0 z-40">
        <div className="px-3 py-3 flex justify-between items-center">
          <h1 className="text-lg font-bold text-indigo-800">إدارة أدوار المرضى</h1>
          <SignOutButton />
        </div>
      </header>
      
      <main className="p-3">
        <Authenticated>
          <PatientQueue />
        </Authenticated>
        
        <Unauthenticated>
          <div className="flex items-center justify-center min-h-[70vh]">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-3">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">مرحباً بك</h2>
                <p className="text-gray-600 text-sm">يرجى تسجيل الدخول للمتابعة</p>
              </div>
              <SignInForm />
            </div>
          </div>
        </Unauthenticated>
      </main>
      
      <Toaster position="top-center" />
    </div>
  );
}

function PatientQueue() {
  const patients = useQuery(api.patients.list) || [];
  const completedPatients = useQuery(api.patients.listCompleted) || [];
  const addPatient = useMutation(api.patients.add);
  const updatePatient = useMutation(api.patients.update);
  const removePatient = useMutation(api.patients.remove);
  const markCompleted = useMutation(api.patients.markCompleted);
  const restorePatient = useMutation(api.patients.restorePatient);
  const reorderPatient = useMutation(api.patients.reorder);
  const clearAll = useMutation(api.patients.clearAll);
  const clearCompleted = useMutation(api.patients.clearCompleted);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Id<"patients"> | null>(null);
  const [showCompletedSection, setShowCompletedSection] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: "", examination: "" });
  const [editForm, setEditForm] = useState({ name: "", examination: "" });
  const [openDropdown, setOpenDropdown] = useState<Id<"patients"> | null>(null);
  const [showHeaderDropdown, setShowHeaderDropdown] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (headerDropdownRef.current && !headerDropdownRef.current.contains(event.target as Node)) {
        setShowHeaderDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name.trim() || !newPatient.examination.trim()) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }
    
    try {
      await addPatient(newPatient);
      setNewPatient({ name: "", examination: "" });
      setShowAddForm(false);
      toast.success("تم إضافة المريض بنجاح");
    } catch (error) {
      toast.error("حدث خطأ أثناء إضافة المريض");
    }
  };

  const handleUpdatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPatient || !editForm.name.trim() || !editForm.examination.trim()) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }
    
    try {
      await updatePatient({ id: editingPatient, ...editForm });
      setEditingPatient(null);
      setEditForm({ name: "", examination: "" });
      toast.success("تم تحديث بيانات المريض");
    } catch (error) {
      toast.error("حدث خطأ أثناء التحديث");
    }
  };

  const handleRemovePatient = async (id: Id<"patients">) => {
    try {
      await removePatient({ id });
      setOpenDropdown(null);
      toast.success("تم حذف المريض");
    } catch (error) {
      toast.error("حدث خطأ أثناء الحذف");
    }
  };

  const handleMarkCompleted = async (id: Id<"patients">) => {
    try {
      const patient = await markCompleted({ id });
      if (patient) {
        toast.success(`تم إكمال فحص المريض: ${patient.name}`);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء إكمال الفحص");
    }
  };

  const handleRestorePatient = async (id: Id<"patients">) => {
    try {
      const patient = await restorePatient({ id });
      if (patient) {
        setOpenDropdown(null);
        toast.success(`تم استعادة دور المريض: ${patient.name}`);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء استعادة الدور");
    }
  };

  const handleReorder = async (patientId: Id<"patients">, direction: "up" | "down") => {
    const patient = patients.find(p => p._id === patientId);
    if (!patient) return;
    
    const newPosition = direction === "up" 
      ? Math.max(1, patient.actualPosition - 1)
      : Math.min(patients.length, patient.actualPosition + 1);
    
    try {
      await reorderPatient({ patientId, newPosition });
      toast.success("تم تغيير الترتيب");
    } catch (error) {
      toast.error("حدث خطأ أثناء تغيير الترتيب");
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("هل أنت متأكد من حذف جميع المرضى؟")) {
      try {
        await clearAll();
        setShowHeaderDropdown(false);
        toast.success("تم حذف جميع المرضى");
      } catch (error) {
        toast.error("حدث خطأ أثناء الحذف");
      }
    }
  };

  const handleClearCompleted = async () => {
    if (window.confirm("هل أنت متأكد من حذف جميع المرضى المكتملين؟")) {
      try {
        await clearCompleted();
        toast.success("تم حذف جميع المرضى المكتملين");
      } catch (error) {
        toast.error("حدث خطأ أثناء الحذف");
      }
    }
  };

  const startEdit = (patient: any) => {
    setEditingPatient(patient._id);
    setEditForm({ name: patient.name, examination: patient.examination });
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md text-sm"
          >
            إضافة مريض جديد
          </button>
          
          {/* Header Three dots menu */}
          <div className="relative" ref={headerDropdownRef}>
            <button
              onClick={() => setShowHeaderDropdown(!showHeaderDropdown)}
              className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg text-sm transition-colors"
            >
              ⋮
            </button>
            
            {showHeaderDropdown && (
              <div className="dropdown-menu">
                {patients.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="dropdown-item"
                  >
                    حذف جميع المرضى
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Patient Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">إضافة مريض جديد</h3>
          <form onSubmit={handleAddPatient} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم المريض</label>
              <input
                type="text"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                placeholder="أدخل اسم المريض"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع الفحص</label>
              <input
                type="text"
                value={newPatient.examination}
                onChange={(e) => setNewPatient({ ...newPatient, examination: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                placeholder="أدخل نوع الفحص"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                إضافة المريض
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewPatient({ name: "", examination: "" });
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Waiting Patients List */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800">قائمة الانتظار</h2>
        {patients.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-gray-400 text-4xl mb-3">👥</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">لا يوجد مرضى في القائمة</h3>
            <p className="text-gray-500 text-sm">ابدأ بإضافة مريض جديد</p>
          </div>
        ) : (
          patients.map((patient, index) => (
            <div key={patient._id} className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
              {editingPatient === patient._id ? (
                <form onSubmit={handleUpdatePatient} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">اسم المريض</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">نوع الفحص</label>
                    <input
                      type="text"
                      value={editForm.examination}
                      onChange={(e) => setEditForm({ ...editForm, examination: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                    >
                      حفظ
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPatient(null);
                        setEditForm({ name: "", examination: "" });
                      }}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="bg-indigo-100 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                        {patient.actualPosition}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">{patient.name}</h3>
                        <p className="text-gray-600 text-sm">{patient.examination}</p>
                        <p className="text-xs text-indigo-600 font-medium">
                          {patient.patientsAhead === 0 
                            ? "المريض التالي" 
                            : `${patient.patientsAhead} مريض أمامه`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {/* Complete Examination Button */}
                    <button
                      onClick={() => handleMarkCompleted(patient._id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs transition-colors font-medium"
                    >
                      إكمال الفحص
                    </button>
                    
                    {/* Reorder buttons */}
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleReorder(patient._id, "up")}
                        disabled={index === 0}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-2 py-1.5 rounded text-xs transition-colors"
                        title="تقديم"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => handleReorder(patient._id, "down")}
                        disabled={index === patients.length - 1}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-2 py-1.5 rounded text-xs transition-colors"
                        title="تأخير"
                      >
                        ↓
                      </button>
                    </div>
                    
                    {/* Edit button */}
                    <button
                      onClick={() => startEdit(patient)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-xs transition-colors"
                    >
                      تعديل
                    </button>
                    
                    {/* Three dots menu */}
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === patient._id ? null : patient._id)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1.5 rounded-lg text-xs transition-colors"
                      >
                        ⋮
                      </button>
                      
                      {openDropdown === patient._id && (
                        <div className="dropdown-menu">
                          <button
                            onClick={() => handleRemovePatient(patient._id)}
                            className="dropdown-item"
                          >
                            حذف المريض
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Completed Patients Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">المرضى المكتملين ({completedPatients.length})</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCompletedSection(!showCompletedSection)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-xs transition-colors"
            >
              {showCompletedSection ? "إخفاء" : "إظهار"}
            </button>
            {completedPatients.length > 0 && (
              <button
                onClick={handleClearCompleted}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs transition-colors"
              >
                حذف المكتملين
              </button>
            )}
          </div>
        </div>

        {showCompletedSection && (
          <div className="space-y-2">
            {completedPatients.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-gray-400 text-3xl mb-2">✅</div>
                <h3 className="text-base font-medium text-gray-600">لا يوجد مرضى مكتملين</h3>
              </div>
            ) : (
              completedPatients.map((patient) => (
                <div key={patient._id} className="bg-green-50 border border-green-200 rounded-xl shadow-sm p-3 completed-patient">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                        ✓
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-gray-800">{patient.name}</h3>
                        <p className="text-gray-600 text-xs">{patient.examination}</p>
                        <p className="text-green-600 text-xs font-medium">
                          اكتمل في: {formatTime(patient.completedAt || 0)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === patient._id ? null : patient._id)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1.5 rounded-lg text-xs transition-colors"
                      >
                        ⋮
                      </button>
                      
                      {openDropdown === patient._id && (
                        <div className="dropdown-menu">
                          <button
                            onClick={() => handleRestorePatient(patient._id)}
                            className="w-full text-right px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm transition-colors"
                          >
                            استعادة الدور
                          </button>
                          <button
                            onClick={() => handleRemovePatient(patient._id)}
                            className="dropdown-item"
                          >
                            حذف المريض
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
