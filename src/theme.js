import { extendTheme } from '@chakra-ui/react'

export const breakpoints = {
  desktop: '425px',
}

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
    BloctoBlue: {
      Light01: '#365BEA',
      Light02: '#0A94FF',
      Light03: '#A6D9FF',
      Light04: '#E0F0FF',
      Light05: '#F0F8FF',
      Light06: '#F0F3F8',
    },
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
    Input: {
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
              boxShadow: `0 0 0 1px gray03`,
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
    Checkbox: {
      baseStyle: {
        control: {
          border: '1px solid',
          borderRadius: '5px',
          _checked: {
            bg: 'BloctoBlue.Light02',
            borderColor: 'BloctoBlue.Light02',
          },
          _readOnly: {
            bg: 'gray04',
            borderColor: 'gray04',
            userSelect: 'none',
            _checked: {
              bg: 'BloctoBlue.Light02',
              borderColor: 'BloctoBlue.Light02',
              '& ~ span': {
                color: 'inherit',
              },
            },
            '& ~ span': {
              color: 'gray01',
            },
          },
        },
      },
      sizes: {
        md: {
          control: { w: '20px', h: '20px' },
          label: { fontSize: '14px', fontWeight: '500', ml: '10px' },
        },
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
        },
        secondary: {
          background: 'white',
          backgroundColor: 'white',
          color: 'BloctoBlue.Light02',
          transition: 'all 0.2s ease-in-out',
          borderRadius: 100,
          _hover: {
            borderColor: 'transparent',
            opacity: 0.8,
            transform: 'scale(0.98)',
          },
          _active: {
            borderColor: 'transparent',
            opacity: 0.9,
          },
          _focus: {
            borderColor: 'transparent',
          },
        },
        hamburger: {
          color: "#FFF3CD",
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
          color: "#794D0B",
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
          color: "#464646",
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
          color: "#FFF3CD",
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
          color: "#292229",
          width: "72px",
          height: "39px",
          padding: "10px",
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
    Tooltip: {
      baseStyle: {
        borderRadius: '8px',
        fontSize: '12px',
      },
    },
    Alert: {
      variants: {
        BloctoBlue: {
          container: {
            background: 'BloctoBlue.Light01',
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
    Menu: {
      baseStyle: {
        list: {
          minWidth: '100px',
          border: 'none',
          py: '0',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
          borderRadius: '12px',
        },
        item: {
          px: '20px',
          minHeight: '62px',
          transition: 'all 0.2s ease-in-out',
          _hover: {
            transform: 'scale(0.98)',
            background: 'none',
          },
          _focus: {
            background: 'none',
          },
          WebkitTapHighlightColor: 'transparent',
        },
        groupTitle: {
          fontSize: '16px',
          m: '0',
          p: '20px 20px 12px',
        },
      },
      variants: {
        header: {
          item: {
            minHeight: '40px',
            fontSize: '12px',
          },
        },
      },
    },
  },
  breakpoints,
})

export default theme
