import { Colors } from '@/constants/Colors'
import { useThemeColors } from '@/hooks/useThemeColors'
import React from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

const styles = StyleSheet.create({
    body5: {
        fontSize: 10,
        lineHeight: 16,
    },
    headline: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: "bold"
    },
    caption: {
        fontSize: 8,
        lineHeight: 12,
    },
    subtitle1: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: "bold"
    },
    subtitle2: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "bold"
    },
    subtitle3: {
        fontSize: 10,
        lineHeight: 16,
        fontWeight: "bold"
    }
})

type props = TextProps & {
    variant ?: keyof typeof styles,
    color ?: keyof typeof Colors["light"],

}

export default function ThemeText({ variant, color, style, ...rest }: props) {
    const colors = useThemeColors()
  return (
    <Text style={[styles[variant ?? 'body5'], {color: colors[color ?? "grayDark"]}]} {...rest} />
  )
}


