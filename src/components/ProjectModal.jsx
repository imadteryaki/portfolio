import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FiImage, FiTrash2, FiUploadCloud, FiX } from "react-icons/fi";

function ProjectModal({
    isOpen,
    onClose,
    editingProject,
    onSuccess,
}) {
    const { t, i18n } = useTranslation();

    const isArabic = i18n.language?.startsWith("ar");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        imagePublicId: "",
        github: "",
        liveDemo: "",
        technologies: "",
        status: "planned",
        featured: false,
    });

    const [uploadingImage, setUploadingImage] = useState(false);
    const [savingProject, setSavingProject] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        if (editingProject) {
            setFormData({
                title: editingProject.title || "",
                description: editingProject.description || "",
                image: editingProject.image || "",
                imagePublicId: editingProject.imagePublicId || "",
                github: editingProject.github || "",
                liveDemo: editingProject.liveDemo || "",
                technologies: editingProject.technologies?.join(", ") || "",
                status: editingProject.status || "planned",
                featured: Boolean(editingProject.featured),
            });
        } else {
            setFormData({
                title: "",
                description: "",
                image: "",
                imagePublicId: "",
                github: "",
                liveDemo: "",
                technologies: "",
                status: "planned",
                featured: false,
            });
        }

        setUploadingImage(false);
        setSavingProject(false);
    }, [editingProject, isOpen]);

    useEffect(() => {
        if (!isOpen) return undefined;

        const handleEscape = (event) => {
            if (event.key === "Escape" && !uploadingImage && !savingProject) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose, savingProject, uploadingImage]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((previous) => ({
            ...previous,
            image: "",
            imagePublicId: "",
        }));
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files?.[0];

        event.target.value = "";

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error(t("project.imageTypeError"));
            return;
        }

        const maxFileSize = 5 * 1024 * 1024;

        if (file.size > maxFileSize) {
            toast.error(t("project.imageSizeError"));
            return;
        }

        const token = localStorage.getItem("adminToken");

        if (!token) {
            toast.error(t("project.unauthorized"));
            return;
        }

        const uploadToast = toast.loading(t("project.uploadingImage"));
        setUploadingImage(true);

        try {
            const uploadData = new FormData();
            uploadData.append("image", file);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: uploadData,
            });

            const data = await response.json();

            if (!response.ok || !data.success || !data.imageUrl) {
                throw new Error(data.message || t("project.imageUploadFailed"));
            }

            setFormData((previous) => ({
                ...previous,
                image: data.imageUrl,
                imagePublicId: data.publicId,
            }));
            toast.success(t("project.imageUploadSuccess"), {
                id: uploadToast,
            });
        } catch (error) {
            toast.error(error.message || t("project.imageUploadFailed"), {
                id: uploadToast,
            });
        } finally {
            setUploadingImage(false);
        }
    };

    const handleRemoveImage = () => {
        setFormData((previous) => ({
            ...previous,
            image: "",
            imagePublicId: "",
        }));

        toast.success(t("project.imageRemoved"));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (uploadingImage) {
            toast.error(t("project.waitForUpload"));
            return;
        }

        const token = localStorage.getItem("adminToken");

        if (!token) {
            toast.error(t("project.unauthorized"));
            return;
        }

        const loadingToast = toast.loading(
            editingProject
                ? t("dashboard.saving")
                : t("dashboard.creating"),
        );

        setSavingProject(true);

        try {
            const body = {
                ...formData,
                title: formData.title.trim(),
                description: formData.description.trim(),
                image: formData.image.trim(),
                github: formData.github.trim(),
                liveDemo: formData.liveDemo.trim(),
                technologies: formData.technologies
                    .split(",")
                    .map((technology) => technology.trim())
                    .filter(Boolean),
            };

            const response = await fetch(
                editingProject
                    ? `${import.meta.env.VITE_API_URL}/projects/${editingProject._id}`
                    : `${import.meta.env.VITE_API_URL}/projects`,
                {
                    method: editingProject ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    (editingProject
                        ? t("dashboard.updateFailed")
                        : t("dashboard.createFailed")),
                );
            }

            toast.success(
                editingProject
                    ? t("dashboard.updateSuccess")
                    : t("dashboard.createSuccess"),
                {
                    id: loadingToast,
                },
            );

            await onSuccess?.();
            onClose();
        } catch (error) {
            toast.error(
                error.message ||
                (editingProject
                    ? t("dashboard.updateFailed")
                    : t("dashboard.createFailed")),
                {
                    id: loadingToast,
                },
            );
        } finally {
            setSavingProject(false);
        }
    };

    if (!isOpen) return null;

    const isBusy = uploadingImage || savingProject;

    return (
        <div
            className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-black/75
        p-4
        backdrop-blur-sm
      "
            dir={isArabic ? "rtl" : "ltr"}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !isBusy) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                className="
          my-6
          w-full
          max-w-3xl
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[#0f172a]
          text-white
          shadow-2xl
          shadow-black/50
        "
            >
                <div
                    className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            px-6
            py-5
            md:px-8
          "
                >
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
                            {t("dashboard.adminPanel")}
                        </p>

                        <h2 id="project-modal-title" className="mt-1 text-2xl font-bold">
                            {editingProject
                                ? t("dashboard.editProject")
                                : t("dashboard.addProject")}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isBusy}
                        aria-label={t("dashboard.cancel")}
                        className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/5
              text-xl
              text-white/60
              transition
              hover:bg-white/10
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
                    >
                        <FiX />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="
            max-h-[calc(100dvh-140px)]
            space-y-5
            overflow-y-auto
            px-6
            py-6
            md:px-8
          "
                >
                    <div>
                        <label
                            htmlFor="project-title"
                            className="mb-2 block text-sm font-medium text-white/80"
                        >
                            {t("project.title")}
                        </label>

                        <input
                            id="project-title"
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-4
                py-3
                text-white
                outline-none
                transition
                placeholder:text-white/25
                focus:border-orange-500
                focus:ring-2
                focus:ring-orange-500/10
              "
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="project-description"
                            className="mb-2 block text-sm font-medium text-white/80"
                        >
                            {t("project.description")}
                        </label>

                        <textarea
                            id="project-description"
                            name="description"
                            required
                            rows={5}
                            value={formData.description}
                            onChange={handleChange}
                            className="
                w-full
                resize-y
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-4
                py-3
                text-white
                outline-none
                transition
                placeholder:text-white/25
                focus:border-orange-500
                focus:ring-2
                focus:ring-orange-500/10
              "
                        />
                    </div>

                    {/* Image Upload */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                            {t("project.image")}
                        </label>

                        <div
                            className="
                overflow-hidden
                rounded-2xl
                border
                border-dashed
                border-white/15
                bg-white/[0.03]
              "
                        >
                            {formData.image ? (
                                <div className="relative">
                                    <img
                                        src={formData.image}
                                        alt={formData.title || t("project.imagePreview")}
                                        className="h-52 w-full object-cover"
                                    />

                                    <div
                                        className="
                      absolute
                      inset-x-0
                      bottom-0
                      flex
                      flex-wrap
                      items-center
                      justify-end
                      gap-2
                      bg-gradient-to-t
                      from-black/90
                      to-transparent
                      p-4
                      pt-12
                    "
                                    >
                                        <label
                                            className={`
                        inline-flex
                        cursor-pointer
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/15
                        bg-black/40
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-white
                        backdrop-blur-md
                        transition
                        hover:bg-black/60
                        ${uploadingImage
                                                    ? "pointer-events-none opacity-50"
                                                    : ""
                                                }
                      `}
                                        >
                                            <FiUploadCloud />

                                            {uploadingImage
                                                ? t("project.uploadingImage")
                                                : t("project.changeImage")}

                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={isBusy}
                                                className="hidden"
                                            />
                                        </label>

                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            disabled={isBusy}
                                            className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-red-500/30
                        bg-red-500/15
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-red-200
                        backdrop-blur-md
                        transition
                        hover:bg-red-500/25
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                                        >
                                            <FiTrash2 />
                                            {t("project.removeImage")}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label
                                    className={`
                    flex
                    min-h-44
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    px-6
                    py-8
                    text-center
                    transition
                    hover:bg-white/[0.04]
                    ${uploadingImage
                                            ? "pointer-events-none opacity-60"
                                            : ""
                                        }
                  `}
                                >
                                    <div
                                        className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-orange-500/20
                      bg-orange-500/10
                      text-2xl
                      text-orange-400
                    "
                                    >
                                        {uploadingImage ? (
                                            <span className="animate-spin">◌</span>
                                        ) : (
                                            <FiImage />
                                        )}
                                    </div>

                                    <p className="mt-4 font-semibold text-white">
                                        {uploadingImage
                                            ? t("project.uploadingImage")
                                            : t("project.chooseImage")}
                                    </p>

                                    <p className="mt-2 text-sm text-white/45">
                                        {t("project.imageHint")}
                                    </p>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={isBusy}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        {/* Optional manual URL */}

                        <div className="mt-3">
                            <label
                                htmlFor="project-image-url"
                                className="mb-2 block text-xs font-medium text-white/50"
                            >
                                {t("project.imageUrlOptional")}
                            </label>

                            <input
                                id="project-image-url"
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://..."
                                disabled={uploadingImage}
                                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-white/25
                  focus:border-orange-500
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="project-technologies"
                            className="mb-2 block text-sm font-medium text-white/80"
                        >
                            {t("project.technologies")}
                        </label>

                        <input
                            id="project-technologies"
                            type="text"
                            name="technologies"
                            required
                            value={formData.technologies}
                            onChange={handleChange}
                            placeholder="React, Node.js, MongoDB"
                            className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-4
                py-3
                text-white
                outline-none
                transition
                placeholder:text-white/25
                focus:border-orange-500
              "
                        />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label
                                htmlFor="project-github"
                                className="mb-2 block text-sm font-medium text-white/80"
                            >
                                {t("project.github")}
                            </label>

                            <input
                                id="project-github"
                                type="url"
                                name="github"
                                required
                                value={formData.github}
                                onChange={handleChange}
                                placeholder="https://github.com/..."
                                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-3
                  text-white
                  outline-none
                  transition
                  placeholder:text-white/25
                  focus:border-orange-500
                "
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="project-live-demo"
                                className="mb-2 block text-sm font-medium text-white/80"
                            >
                                {t("project.live")}
                            </label>

                            <input
                                id="project-live-demo"
                                type="url"
                                name="liveDemo"
                                required
                                value={formData.liveDemo}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-3
                  text-white
                  outline-none
                  transition
                  placeholder:text-white/25
                  focus:border-orange-500
                "
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="project-status"
                            className="mb-2 block text-sm font-medium text-white/80"
                        >
                            {t("project.status")}
                        </label>

                        <select
                            id="project-status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#0f172a]
                px-4
                py-3
                text-white
                outline-none
                transition
                focus:border-orange-500
              "
                        >
                            <option value="planned">
                                {t("project.statuses.planned")}
                            </option>

                            <option value="in-development">
                                {t("project.statuses.inDevelopment")}
                            </option>

                            <option value="completed">
                                {t("project.statuses.completed")}
                            </option>
                        </select>
                    </div>

                    <label
                        className="
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              p-4
            "
                    >
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="h-4 w-4 accent-orange-500"
                        />

                        <span className="text-sm font-medium text-white/80">
                            {t("project.featured")}
                        </span>
                    </label>

                    <div
                        className="
              sticky
              bottom-0
              -mx-6
              flex
              flex-col-reverse
              gap-3
              border-t
              border-white/10
              bg-[#0f172a]/95
              px-6
              pb-1
              pt-5
              backdrop-blur-xl
              sm:flex-row
              sm:justify-end
              md:-mx-8
              md:px-8
            "
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isBusy}
                            className="
                rounded-xl
                border
                border-white/10
                px-5
                py-3
                font-medium
                text-white/80
                transition
                hover:bg-white/10
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
                        >
                            {t("dashboard.cancel")}
                        </button>

                        <button
                            type="submit"
                            disabled={isBusy}
                            className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-orange-600
                px-6
                py-3
                font-medium
                text-white
                transition
                hover:bg-orange-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
                        >
                            {isBusy && (
                                <span className="animate-spin">◌</span>
                            )}

                            {savingProject
                                ? editingProject
                                    ? t("dashboard.saving")
                                    : t("dashboard.creating")
                                : editingProject
                                    ? t("dashboard.saveChanges")
                                    : t("dashboard.createProject")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProjectModal;