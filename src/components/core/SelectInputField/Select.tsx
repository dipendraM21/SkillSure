import { useMemo } from 'react'
import ReactSelect, { StylesConfig, GroupBase } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { OptionType, SelectProps } from '@/types/components.types'

const readSelectProps = (state: { selectProps: unknown }) => state.selectProps as SelectProps & { isCreatable?: boolean; className?: string }

export const Select = ({ value, onChange, options, onBlur, placeholder, isCreatable, ...atr }: SelectProps & { isCreatable?: boolean }) => {
  const SelectComponent = isCreatable ? CreatableSelect : ReactSelect

  const optionsObject = useMemo(() => {
    if (options && Array.isArray(options)) {
      return options.reduce((acc: Record<string | number, OptionType>, { label, value }: OptionType) => {
        acc[value] = { value, label }
        return acc
      }, {})
    }

    return {}
  }, [options])

  const handleOnchange = (option: unknown) => {
    const value = option ? (Array.isArray(option) ? option.map((item: OptionType) => item.value) : (option as OptionType).value) : ''
    onChange(value)
  }

  const passthrough = atr as Record<string, unknown>
  const resolvedVariant = ((atr as SelectProps).variant ?? 'default') as SelectProps['variant']

  return (
    <SelectComponent
      isClearable
      menuPortalTarget={typeof document !== 'undefined' ? document.body : undefined}
      styles={customStyles}
      placeholder={placeholder}
      value={Array.isArray(value) ? value.map((item) => optionsObject[item] || { label: item, value: item }) : optionsObject[value] || (value ? { label: value, value } : null)}
      onChange={handleOnchange}
      options={options}
      onBlur={onBlur}
      {...passthrough}
      variant={resolvedVariant}
    />
  )
}

const customStyles: StylesConfig<OptionType, boolean, GroupBase<OptionType>> = {
  control: (provided, state) => {
    const sp = readSelectProps(state)
    const v = sp.variant || 'default'

    if (v === 'authCard') {
      // Match login `LOGIN_AUTH_FIELD_CLASS` in Login.tsx: 48px height, slate-300 border, same shadow as text input.
      const borderIdle = '#cbd5e1'
      const borderFocus = 'color-mix(in srgb, var(--color-primary) 70%, transparent)'
      return {
        ...provided,
        width: '100%',
        minHeight: '48px',
        height: '48px',
        alignItems: 'center',
        borderRadius: '12px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: state.isFocused ? borderFocus : borderIdle,
        backgroundColor: '#ffffff',
        boxShadow: state.isFocused ? '0 16px 34px -18px rgba(37, 99, 235, 0.35)' : '0 12px 28px -20px rgba(37, 99, 235, 0.55)',
        outline: 'none',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: 600,
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
        '&:hover': {
          borderColor: state.isFocused ? borderFocus : borderIdle,
        },
      }
    }

    const isMinimal = typeof sp.className === 'string' && (sp.className.includes('border-0') || sp.className.includes('border-none'))

    return {
      ...provided,
      backgroundColor: 'transparent',
      borderWidth: isMinimal ? '0px' : '1px',
      borderColor: state.isFocused ? '#101610' : 'var(--color-border-gray-00000014, #e5e7eb)',
      borderRadius: '0.375rem',
      minHeight: '38px',
      boxShadow: 'none',
      outline: 'none',
      width: '100%',
      fontSize: '0.875rem',
      fontWeight: '600',
      paddingLeft: '0.75rem',
      '&:hover': {
        borderColor: state.isFocused ? '#101610' : 'var(--color-border-gray-00000014, #e5e7eb)',
      },
    }
  },
  valueContainer: (provided, state) => {
    const v = readSelectProps(state).variant
    if (v === 'authCard') {
      // No left icon — use normal inset (`px-4` / 16px); chevron sits in `indicatorsContainer`.
      return {
        ...provided,
        padding: '0 8px 0 16px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }
    }
    return provided
  },
  menu: (provided, state) => {
    const v = readSelectProps(state as { selectProps: unknown }).variant
    const borderIdle = '#cbd5e1'
    return {
      ...provided,
      zIndex: 99990,
      border: v === 'authCard' ? `1px solid ${borderIdle}` : '1px solid var(--color-border-gray-00000014, #e5e7eb)',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      borderRadius: v === 'authCard' ? '12px' : '0.5rem',
      backgroundColor: 'white',
      overflow: 'hidden',
    }
  },
  option: (provided, state) => {
    const v = readSelectProps(state).variant
    const selectedBg = v === 'authCard' ? 'var(--color-primary)' : '#101610'
    const hoverBg = v === 'authCard' ? 'color-mix(in srgb, var(--color-primary) 12%, white)' : '#f3f4f6'
    return {
      ...provided,
      backgroundColor: state.isSelected ? selectedBg : state.isFocused ? hoverBg : 'white',
      color: state.isSelected ? '#ffffff' : 'var(--color-body, #1a1a24)',
      fontWeight: '500',
      cursor: 'pointer',
      fontSize: '0.875rem',
      '&:active': {
        backgroundColor: selectedBg,
        color: '#ffffff',
      },
    }
  },
  singleValue: (provided, state) => {
    const v = readSelectProps(state).variant
    if (v === 'authCard') {
      return {
        ...provided,
        color: 'var(--color-body, #1a1a24)',
        fontWeight: '600',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
      }
    }
    return {
      ...provided,
      color: 'black',
      fontWeight: '600',
    }
  },
  placeholder: (provided, state) => {
    const v = readSelectProps(state).variant
    if (v === 'authCard') {
      return {
        ...provided,
        color: '#94a3b8',
        fontWeight: '400',
        fontSize: '0.875rem',
      }
    }
    return {
      ...provided,
      color: '#9ca3af',
      fontWeight: '400',
    }
  },
  indicatorsContainer: (provided, state) => {
    const v = readSelectProps(state).variant
    if (v === 'authCard') {
      return {
        ...provided,
        alignItems: 'center',
        paddingRight: '4px',
      }
    }
    return provided
  },
  dropdownIndicator: (provided, state) => {
    const v = readSelectProps(state).variant
    if (v === 'authCard') {
      return {
        ...provided,
        paddingLeft: '2px',
        paddingRight: '8px',
        paddingTop: 0,
        paddingBottom: 0,
        color: '#94a3b8',
      }
    }
    return {
      ...provided,
      paddingLeft: '2px',
      paddingRight: '6px',
      color: '#9ca3af',
    }
  },
  clearIndicator: (provided) => ({
    ...provided,
    paddingRight: '2px',
    color: '#9ca3af',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  menuPortal: (base) => ({ ...base, zIndex: 99990 }),
}
