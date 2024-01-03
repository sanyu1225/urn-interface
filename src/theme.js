import { extendTheme } from '@chakra-ui/react';

export const breakpoints = {
  base: '1024px',
  mid: '1440px',
  desktop: '1920px',
};

export const theme = extendTheme({
  fonts: {
    body: 'Inter, Work Sans, sans-serif',
  },
  colors: {
    black: '#141414',
    gray01: '#7F7F7F',
    gray02: '#BCBCBC',
    gray03: '#DCDCDC',
    gray04: '#EFEFEF',
    gray05: '#F9F9F9',
  },
  radii: {
    md: '8px',
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: 'inherit',
      },
      variants: {
        h1: {
          fontSize: '36px',
          lineHeight: '44px',
          fontWeight: '700',
        },
        h3: {
          fontSize: '24px',
          lineHeight: '30px',
          fontWeight: '600',
        },
      },
    },
    Form: {
      baseStyle: {
        helperText: {
          fontSize: '14px',
          lineHeight: '20px',
          color: 'gray01',
          my: '8px',
        },
      },
    },
    FormLabel: {
      baseStyle: {
        mb: '8px',
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '22px',
        color: '#141414',
      },
    },
    Textarea: {
      baseStyle: {
        color: '#',
        borderColor: '#FFF3CD',
      },
    },
    Input: {
      baseStyle: {
        field: {
          color: '#FFF3CD',
          borderColor: '#FFF3CD',
        },
      },
      sizes: {
        md: {
          field: {
            fontSize: '14px',
            px: 4,
            h: '48px',
            borderRadius: '8px',
          },
        },
      },
      variants: {
        outline: {
          field: {
            border: '1px solid',
            borderColor: 'inherit',
            bg: 'inherit',
            _hover: {
              borderColor: 'gray03',
            },
            _readOnly: {
              backgroundColor: 'gray05',
              borderColor: 'gray05',
              userSelect: 'none',
              borderWidth: '0px !important',
            },
            _disabled: {
              backgroundColor: 'gray05',
              cursor: 'not-allowed',
              borderColor: 'gray05',
            },
            _invalid: {
              borderColor: '#FF5555',
              boxShadow: 'none',
            },
            _focusVisible: {
              zIndex: 1,
              borderColor: 'gray03',
              boxShadow: '0 0 0 1px gray03',
              borderWidth: '1.5px',
            },
            _placeholder: {
              color: 'gray02',
            },
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: { borderRadius: '20px' },
      },
    },
    Button: {
      variants: {
        primary: {
          background: '#FFF3CD',
          backgroundColor: '#FFF3CD',
          transition: 'all 0.2s ease-in-out',
          borderRadius: 100,
          color: '#292229',
          fontSize: '16px',
          fontWeight: '600',
          _hover: {
            textDecoration: 'none',
            borderColor: 'transparent',
            backgroundColor: '#E3D4A2',
            opacity: 0.8,
            transform: 'scale(0.98)',
          },
          _active: {
            borderColor: 'transparent',
            backgroundColor: '#E3D4A2',
            opacity: 0.9,
            transform: 'scale(0.96)',
          },
          _focus: {
            borderColor: 'transparent',
            boxShadow: 'none',
          },
          _disabled: {
            cursor: 'not-allowed',
            backgroundColor: 'gray05',
          },
        },
        hamburger: {
          color: '#FFF3CD',
          background: '#292229',
          backgroundColor: '#292229',
          transition: 'all 0.2s ease-in-out',
          borderRadius: 10,
          fontSize: '16px',
          fontWeight: '600',
          _hover: {
            borderColor: 'transparent',
            backgroundColor: '#292229',
            opacity: 0.8,
            transform: 'scale(0.98)',
          },
          _active: {
            borderColor: 'transparent',
            backgroundColor: '#292229',
            opacity: 0.9,
            transform: 'scale(0.96)',
          },
          _focus: {
            borderColor: 'transparent',
            boxShadow: 'none',
          },
        },
        gold: {
          background: '#F0CE37',
          backgroundColor: '#F0CE37',
          transition: 'all 0.2s ease-in-out',
          borderRadius: 100,
          fontSize: '16px',
          fontWeight: '600',
          color: '#794D0B',
          _hover: {
            borderColor: 'transparent',
            backgroundColor: '#F0CE37',
            opacity: 0.8,
            transform: 'scale(0.98)',
          },
          _active: {
            borderColor: 'transparent',
            backgroundColor: '#F0CE37',
            opacity: 0.9,
            transform: 'scale(0.96)',
          },
          _focus: {
            borderColor: 'transparent',
            boxShadow: 'none',
          },
        },
        lightGray: {
          height: '2rem',
          minWidth: '1.5rem',
          background: '#F3F3F3',
          backgroundColor: '#F3F3F3',
          transition: 'all 0.2s ease-in-out',
          borderRadius: 100,
          fontSize: '16px',
          fontWeight: '600',
          color: '#464646',
          _hover: {
            borderColor: 'transparent',
            backgroundColor: '#F3F3F3',
            opacity: 0.8,
            transform: 'scale(0.98)',
          },
          _active: {
            borderColor: 'transparent',
            backgroundColor: '#F3F3F3',
            opacity: 0.9,
            transform: 'scale(0.96)',
          },
          _focus: {
            borderColor: 'transparent',
            boxShadow: 'none',
          },
        },
        dark: {
          background: '#353135',
          backgroundColor: '#353135',
          transition: 'all 0.2s ease-in-out',
          borderRadius: 100,
          fontSize: '16px',
          fontWeight: '600',
          color: '#FFF3CD',
          _hover: {
            borderColor: 'transparent',
            backgroundColor: '#353135',
            opacity: 0.8,
            transform: 'scale(0.98)',
          },
          _active: {
            borderColor: 'transparent',
            backgroundColor: '#353135',
            opacity: 0.9,
            transform: 'scale(0.96)',
          },
          _focus: {
            borderColor: 'transparent',
            boxShadow: 'none',
          },
        },
        putIn: {
          background: '#FFE182',
          backgroundColor: '#FFE182',
          transition: 'all 0.2s ease-in-out',
          borderRadius: 100,
          fontSize: '16px',
          fontWeight: '600',
          color: '#292229',
          width: '72px',
          height: '39px',
          padding: '10px',
          _hover: {
            borderColor: 'transparent',
            backgroundColor: '#F6D469',
            opacity: 0.8,
            transform: 'scale(0.98)',
          },
          _active: {
            borderColor: 'transparent',
            backgroundColor: '#F6D469',
            opacity: 0.9,
            transform: 'scale(0.96)',
          },
          _focus: {
            borderColor: 'transparent',
            boxShadow: 'none',
          },
        },
        arrow: {
          background: '#49473E',
          backgroundColor: '#49473E',
          transition: 'all 0.2s ease-in-out',
          borderRadius: 100,
          color: '#FFF3CD',
          fontSize: '16px',
          fontWeight: '600',
          _hover: {
            textDecoration: 'none',
            borderColor: 'transparent',
            opacity: 0.8,
            transform: 'translateY(-50%) scale(0.98)',
          },
          _active: {
            borderColor: 'transparent',
            opacity: 0.9,
            transform: 'translateY(-50%) scale(0.96)',
          },
          _focus: {
            borderColor: 'transparent',
            boxShadow: 'none',
          },
          _disabled: {
            cursor: 'not-allowed',
            backgroundColor: 'gray05',
          },
        },
        basic: {
          background: '#transparent',
          backgroundColor: 'transparent',
          borderColor: '#FFF3CD',
          border: '1px solid ',
          transition: 'all 0.2s ease-in-out',
          borderRadius: 100,
          fontSize: '16px',
          fontWeight: '600',
          color: '#FFF3CD',
          width: '72px',
          height: '39px',
          padding: '10px',
          _hover: {
            backgroundColor: '#FFF3CD',
            opacity: 0.8,
            color: '#292229',
            transform: 'scale(0.98)',
          },
          _active: {
            backgroundColor: '#FFF3CD',
            opacity: 0.9,
            color: '#292229',
            transform: 'scale(0.96)',
          },
          _focus: {
            boxShadow: 'none',
          },
        },
      },
      sizes: {
        sm: { fontSize: '14px', px: '20px', py: '10px' },
        lg: { fontSize: '16px', px: '32px', py: '14px' },
      },
      defaultProps: {
        variant: 'primary',
        size: 'lg',
      },
      baseStyle: {
        _disabled: {
          pointerEvents: 'none',
        },
      },
    },
    Alert: {
      variants: {
        Blue: {
          container: {
            background: 'blue.100',
            color: 'white',
            borderRadius: '8px',
            px: '15px',
            py: '14px',
            boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.08)',
          },
          title: {
            fontWeight: '500',
          },
        },
      },
    },
  },
  breakpoints,
});

export default theme;
