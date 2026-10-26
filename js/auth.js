/* This authentication system is for demo purposes only.
Never store plain-text passwords in production. */
const Auth = {
  patterns: {
    fullName: /^[\p{L}]+(?:[ '.-][\p{L}]+)*$/u,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/,
    phone: /^(?:0|\+84)(?:3|5|7|8|9)\d{8}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9\s])\S{8,}$/,
  },
  seed() {
    const users = Storage.get(KEYS.users, []);
    const demo = users.find((user) => user.email === "demo@texaschicken.local");
    if (!demo) {
      users.push({
        id: "user-demo",
        fullName: "Khách Demo",
        email: "demo@texaschicken.local",
        phone: "0901234567",
        password: "Demo@1234",
      });
      Storage.set(KEYS.users, users);
    } else if (demo.password === "123456") {
      demo.password = "Demo@1234";
      Storage.set(KEYS.users, users);
    }
  },
  current() {
    return Storage.get(KEYS.currentUser, null);
  },
  register(data) {
    const users = Storage.get(KEYS.users, []);
    if (
      users.some(
        (user) => user.email.toLowerCase() === data.email.toLowerCase(),
      )
    )
      return { ok: false, message: "Email này đã được đăng ký." };
    const user = {
      id: `user-${Date.now()}`,
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      password: data.password,
    };
    users.push(user);
    Storage.set(KEYS.users, users);
    return { ok: true };
  },
  login(email, password) {
    const user = Storage.get(KEYS.users, []).find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password,
    );
    if (!user) return { ok: false, message: "Email hoặc mật khẩu chưa đúng." };
    const safeUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    };
    Storage.set(KEYS.currentUser, safeUser);
    return { ok: true, user: safeUser };
  },
  logout() {
    Storage.remove(KEYS.currentUser);
    location.href = getPagePath("home");
  },
  updateProfile(data) {
    const current = this.current();
    if (!current) return false;
    const users = Storage.get(KEYS.users, []);
    const found = users.find((user) => user.id === current.id);
    if (!found) return false;
    found.fullName = data.fullName.trim();
    found.phone = data.phone.trim();
    Storage.set(KEYS.users, users);
    Storage.set(KEYS.currentUser, {
      id: found.id,
      fullName: found.fullName,
      email: found.email,
      phone: found.phone,
    });
    return true;
  },
};
Auth.seed();
