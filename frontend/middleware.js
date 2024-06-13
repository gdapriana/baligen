export function middleware(request) {
  const currentUser = request.cookies.get('refreshToken')?.value
  console.log(currentUser);
}
