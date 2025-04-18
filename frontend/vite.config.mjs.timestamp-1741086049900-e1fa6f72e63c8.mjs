// vite.config.mjs
import { defineConfig, loadEnv } from "file:///home/exilance-software/Documents/exilance-project/Vehicle-Management/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///home/exilance-software/Documents/exilance-project/Vehicle-Management/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import jsconfigPaths from "file:///home/exilance-software/Documents/exilance-project/Vehicle-Management/frontend/node_modules/vite-jsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const API_URL = `${env.VITE_APP_BASE_NAME}`;
  const PORT = `${"3000"}`;
  return {
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 3000
      port: PORT
    },
    define: {
      global: "window"
    },
    resolve: {
      alias: [
      
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false
        },
        less: {
          charset: false
        }
      },
      charset: false,
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },
    base: API_URL,
    plugins: [react(), jsconfigPaths()]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvZXhpbGFuY2Utc29mdHdhcmUvRG9jdW1lbnRzL2V4aWxhbmNlLXByb2plY3QvVmVoaWNsZS1NYW5hZ2VtZW50L2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9leGlsYW5jZS1zb2Z0d2FyZS9Eb2N1bWVudHMvZXhpbGFuY2UtcHJvamVjdC9WZWhpY2xlLU1hbmFnZW1lbnQvZnJvbnRlbmQvdml0ZS5jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2V4aWxhbmNlLXNvZnR3YXJlL0RvY3VtZW50cy9leGlsYW5jZS1wcm9qZWN0L1ZlaGljbGUtTWFuYWdlbWVudC9mcm9udGVuZC92aXRlLmNvbmZpZy5tanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQganNjb25maWdQYXRocyBmcm9tICd2aXRlLWpzY29uZmlnLXBhdGhzJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKTtcbiAgY29uc3QgQVBJX1VSTCA9IGAke2Vudi5WSVRFX0FQUF9CQVNFX05BTUV9YDtcbiAgY29uc3QgUE9SVCA9IGAkeyczMDAwJ31gO1xuXG4gIHJldHVybiB7XG4gICAgc2VydmVyOiB7XG4gICAgICAvLyB0aGlzIGVuc3VyZXMgdGhhdCB0aGUgYnJvd3NlciBvcGVucyB1cG9uIHNlcnZlciBzdGFydFxuICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgIC8vIHRoaXMgc2V0cyBhIGRlZmF1bHQgcG9ydCB0byAzMDAwXG4gICAgICBwb3J0OiBQT1JUXG4gICAgfSxcbiAgICBkZWZpbmU6IHtcbiAgICAgIGdsb2JhbDogJ3dpbmRvdydcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiBbXG4gICAgICAgIC8vIHsgZmluZDogJycsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJykgfSxcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgIGZpbmQ6IC9efiguKykvLFxuICAgICAgICAvLyAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ25vZGVfbW9kdWxlcy8kMScpXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICBmaW5kOiAvXnNyYyguKykvLFxuICAgICAgICAvLyAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYy8kMScpXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgIGZpbmQ6ICdhc3NldHMnLFxuICAgICAgICAvLyAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMnKVxuICAgICAgICAvLyB9LFxuICAgICAgXVxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBjaGFyc2V0OiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBsZXNzOiB7XG4gICAgICAgICAgY2hhcnNldDogZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNoYXJzZXQ6IGZhbHNlLFxuICAgICAgcG9zdGNzczoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcG9zdGNzc1BsdWdpbjogJ2ludGVybmFsOmNoYXJzZXQtcmVtb3ZhbCcsXG4gICAgICAgICAgICBBdFJ1bGU6IHtcbiAgICAgICAgICAgICAgY2hhcnNldDogKGF0UnVsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhdFJ1bGUubmFtZSA9PT0gJ2NoYXJzZXQnKSB7XG4gICAgICAgICAgICAgICAgICBhdFJ1bGUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfSxcbiAgICBiYXNlOiBBUElfVVJMLFxuICAgIHBsdWdpbnM6IFtyZWFjdCgpLCBqc2NvbmZpZ1BhdGhzKCldXG4gIH07XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQThaLFNBQVMsY0FBYyxlQUFlO0FBQ3BjLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUUxQixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDM0MsUUFBTSxVQUFVLEdBQUcsSUFBSSxrQkFBa0I7QUFDekMsUUFBTSxPQUFPLEdBQUcsTUFBTTtBQUV0QixTQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUE7QUFBQSxNQUVOLE1BQU07QUFBQTtBQUFBLE1BRU4sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQWNQO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osU0FBUztBQUFBLFFBQ1g7QUFBQSxRQUNBLE1BQU07QUFBQSxVQUNKLFNBQVM7QUFBQSxRQUNYO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLFFBQ1AsU0FBUztBQUFBLFVBQ1A7QUFBQSxZQUNFLGVBQWU7QUFBQSxZQUNmLFFBQVE7QUFBQSxjQUNOLFNBQVMsQ0FBQyxXQUFXO0FBQ25CLG9CQUFJLE9BQU8sU0FBUyxXQUFXO0FBQzdCLHlCQUFPLE9BQU87QUFBQSxnQkFDaEI7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQSxJQUNOLFNBQVMsQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDO0FBQUEsRUFDcEM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
