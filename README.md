Refactor frontend structure and redesign home page

- Split Login/Signup pages into pages (logic) + components (UI)
- Add services layer (apiClient.js, authService.js) for API calls
- Rename Signup to Register, YourApp to TaskPilot
- Redesign Home page with todo CRUD, metrics, profile sidebar
- Add disabled button styles and nginx cache-bust for index.html
