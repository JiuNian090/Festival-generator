module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#C91F37', // 国风红
        secondary: '#385A39', // 墨绿
        tertiary: '#1E3A8A', // 深蓝
        neutral: '#F8F5F0', // 米白背景色
        dark: '#333333', // 深灰文字
      },
      fontFamily: {
        'source-sans': ['"思源黑体CN"', 'sans-serif'],
        'source-serif': ['"思源宋体CN"', 'serif']
      },
      animation: {
        'brush': 'brush 1.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards'
      },
      keyframes: {
        brush: {
          '0%': { strokeDashoffset: '100%', opacity: 0 },
          '100%': { strokeDashoffset: '0', opacity: 1 }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      }
    }
  },
  plugins: []
}