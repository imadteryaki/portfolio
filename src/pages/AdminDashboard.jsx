import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

import ProjectModal from "../components/ProjectModal";

function AdminDashboard() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const { t, i18n } = useTranslation();

    const isArabic = i18n.language?.startsWith("ar");

    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || t("dashboard.loadFailed")
                );
            }

            const projectsData = Array.isArray(data.projects)
                ? data.projects
                : Array.isArray(data)
                    ? data
                    : [];

            setProjects(projectsData);
        } catch (error) {
            setError(
                error.message || t("dashboard.loadFailed")
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [t]);

    const handleDelete = (id) => {
        toast(
            (currentToast) => (
                <div className="min-w-[250px]">
                    <p className="font-semibold text-white">
                        {t("dashboard.deleteTitle")}
                    </p>

                    <p className="mt-1 text-sm text-white/60">
                        {t("dashboard.deleteDescription")}
                    </p>

                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => toast.dismiss(currentToast.id)}
                            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:bg-white/10"
                        >
                            {t("dashboard.cancel")}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                toast.dismiss(currentToast.id);
                                deleteProject(id);
                            }}
                            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                        >
                            {t("dashboard.delete")}
                        </button>
                    </div>
                </div>
            ),
            {
                duration: Infinity,
            }
        );
    };

    const deleteProject = async (id) => {
        const loadingToast = toast.loading(t("dashboard.deleting"));

        try {
            const token = localStorage.getItem("adminToken");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || t("dashboard.deleteFailed"));
            }

            setProjects((previousProjects) =>
                previousProjects.filter((project) => project._id !== id)
            );

            toast.success(t("dashboard.deleteSuccess"), {
                id: loadingToast,
            });
        } catch (error) {
            toast.error(error.message || t("dashboard.deleteFailed"), {
                id: loadingToast,
            });
        }
    };

    const openAddModal = () => {
        setEditingProject(null);
        setIsModalOpen(true);
    };

    const openEditModal = (project) => {
        setEditingProject(project);
        setIsModalOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        navigate("/admin/login");
    };

    return (
        <>

            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editingProject={editingProject}
                onSuccess={fetchProjects}
            />
            <main dir={isArabic ? "rtl" : "ltr"}
                className="min-h-screen bg-[#050816] px-6 py-10 text-white">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-orange-500">
                                {t("dashboard.adminPanel")}
                            </p>

                            <h1 className="mt-2 text-4xl font-bold">
                                {t("dashboard.title")}
                            </h1>

                            <p className="mt-2 text-white/50">
                                {t("dashboard.subtitle")}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={openAddModal}
                                className="rounded-xl bg-orange-600 px-5 py-3 font-medium text-white transition hover:bg-orange-700"
                            >
                                {t("dashboard.addProject")}
                            </button>

                            <div className="flex">
                                <LanguageSwitcher />
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-medium text-red-300 transition hover:bg-red-500/20"
                            >
                                {t("dashboard.logout")}
                            </button>
                        </div>
                    </div>
                </div>

                {loading && (
                    <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-white/60">
                        {t("dashboard.loading")}
                    </div>
                )}

                {error && (
                    <div className="mt-10 rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
                        {error}
                    </div>
                )}

                {!loading && !error && projects.length === 0 && (
                    <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-white/60">
                        {t("dashboard.noProjects")}
                    </div>
                )}

                {!loading && !error && projects.length > 0 && (
                    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {projects.map((project) => (
                            <article
                                key={project._id}
                                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]"
                            >
                                {project.image && (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="h-48 w-full object-cover"
                                    />
                                )}

                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <h2 className="text-xl font-bold">
                                            {project.title}
                                        </h2>

                                        {project.featured && (
                                            <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-300">
                                                {t("dashboard.featured")}
                                            </span>
                                        )}
                                    </div>

                                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/60">
                                        {project.description}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {project.technologies?.map((technology) => (
                                            <span
                                                key={technology}
                                                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                                            >
                                                {technology}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-6 flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => openEditModal(project)}
                                            className="flex-1 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 font-medium text-blue-300 transition hover:bg-blue-500/20"
                                        >
                                            {t("dashboard.edit")}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(project._id)}
                                            className="flex-1 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-medium text-red-300 transition hover:bg-red-500/20"
                                        >
                                            {t("dashboard.delete")}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}

export default AdminDashboard;