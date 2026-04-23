export function createLessonScreen(lessonId) {
  return {
    name: "lesson",
    lessonId
  };
}

export function createGradeScreen(gradeId) {
  return {
    name: "grade",
    gradeId
  };
}

export function getScreenFromHash(hash) {
  if (!hash || hash === "#" || hash === "#home") {
    return { name: "home" };
  }

  const normalizedHash = hash.startsWith("#") ? hash.slice(1) : hash;

  if (normalizedHash.startsWith("lesson/")) {
    const lessonId = normalizedHash.slice("lesson/".length);

    if (lessonId) {
      return createLessonScreen(lessonId);
    }
  }

  if (normalizedHash.startsWith("grade/")) {
    const gradeId = normalizedHash.slice("grade/".length);

    if (gradeId) {
      return createGradeScreen(gradeId);
    }
  }

  return { name: "home" };
}

export function getHashForScreen(screen) {
  if (screen.name === "lesson") {
    return `#lesson/${screen.lessonId}`;
  }

  if (screen.name === "grade") {
    return `#grade/${screen.gradeId}`;
  }

  return "#home";
}
