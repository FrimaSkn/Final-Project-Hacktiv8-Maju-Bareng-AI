---
name: StoicMind
colors:
  surface: '#0f1513'
  surface-dim: '#0f1513'
  surface-bright: '#343a39'
  surface-container-lowest: '#090f0e'
  surface-container-low: '#171d1b'
  surface-container: '#1b211f'
  surface-container-high: '#252b2a'
  surface-container-highest: '#303634'
  on-surface: '#dee4e1'
  on-surface-variant: '#c2c8bf'
  inverse-surface: '#dee4e1'
  inverse-on-surface: '#2b3230'
  outline: '#8c928a'
  outline-variant: '#424842'
  surface-tint: '#adcfaf'
  primary: '#adcfaf'
  on-primary: '#193620'
  primary-container: '#86a789'
  on-primary-container: '#1f3c25'
  inverse-primary: '#47664b'
  secondary: '#e6bdbc'
  on-secondary: '#44292a'
  secondary-container: '#5d3f3f'
  on-secondary-container: '#d4abab'
  tertiary: '#c0c9c3'
  on-tertiary: '#2a322e'
  tertiary-container: '#98a19b'
  on-tertiary-container: '#303834'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c8ebca'
  primary-fixed-dim: '#adcfaf'
  on-primary-fixed: '#03210c'
  on-primary-fixed-variant: '#304d35'
  secondary-fixed: '#ffdad9'
  secondary-fixed-dim: '#e6bdbc'
  on-secondary-fixed: '#2c1516'
  on-secondary-fixed-variant: '#5d3f3f'
  tertiary-fixed: '#dce5de'
  tertiary-fixed-dim: '#c0c9c3'
  on-tertiary-fixed: '#151d1a'
  on-tertiary-fixed-variant: '#404944'
  background: '#0f1513'
  on-background: '#dee4e1'
  surface-variant: '#303634'
typography:
  headline-xl:
    fontFamily: Merriweather
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Merriweather
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Merriweather
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Merriweather
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  container-max: 800px
  gutter: 20px
---

## Brand & Style
The design system is rooted in the intersection of ancient wisdom and modern digital minimalism. It aims to evoke a sense of "Ataraxia"—a state of serene calmness and mental clarity. The target audience includes individuals seeking emotional resilience and a reprieve from high-stimulus digital environments.

The visual style is **Minimalist** with a **Tactile** focus on legibility and breathable layouts. By stripping away non-essential UI ornamentation, the system prioritizes the dialogue between the user and the philosophical guide. The aesthetic is intentional, grounded, and quiet, moving away from typical "tech" aesthetics toward a more organic, contemplative atmosphere.

## Colors
The palette is deeply desaturated to reduce visual fatigue and promote focus. 

- **Primary Background (#1E2321):** A deep, earthy sage that provides a stable, non-void foundation.
- **Surface/Bubble (#2A322E):** Used for chat bubbles and container elements to create a subtle layering effect without harsh contrast.
- **Action/Control (#86A789):** A soft sage green reserved for primary actions, affirmations, and things within the user's control.
- **Outside Control (#C29B9B):** A muted dusty rose used for secondary actions, warnings, or elements representing external factors.
- **Text (#E6ECE9):** An off-white that maintains high legibility while avoiding the glare of pure white.

## Typography
The typography system balances the traditional authority of **Merriweather** with the functional clarity of **Inter**. 

Headlines utilize Merriweather to feel like a printed manuscript, lending weight to philosophical insights. Body text utilizes Inter with generous line-height to ensure that even long philosophical passages remain approachable and easy to digest. Capitalization in labels should be used sparingly to maintain a soft, non-aggressive tone.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to prevent text lines from becoming too wide, which aids in deep reading. On mobile, it utilizes a fluid 4-column system.

- **Negative Space:** Use `xxl` spacing between major sections to allow the UI to "breathe."
- **Chat Layout:** Centered column with a maximum width of 640px for optimal readability.
- **Margins:** Generous side margins (at least 24px) to create a "sanctuary" feel, isolating the content from the edges of the device.

## Elevation & Depth
This design system avoids heavy drop shadows in favor of **Tonal Layers**. 

Hierarchy is established through subtle shifts in background value. The base background is the darkest layer. Elements that sit "above" (like chat bubbles or cards) use the `Surface` color. 

For interactive elements like "Dichotomy Cards," use a very low-opacity soft sage or rose glow rather than a black shadow to indicate focus, simulating a natural, ambient light source.

## Shapes
The shape language is organic and soft. Standard UI elements use a 0.5rem (8px) radius to feel approachable. Larger containers like cards or main chat bubbles utilize a 1rem (16px) radius to emphasize their role as "containers for thought."

Avoid sharp corners entirely, as they create visual tension that contradicts the brand's goal of mental calmness.

## Components

### Chat Bubbles
Bubbles should have a soft border (1px, color: #3A4540). The bot's bubbles use the `Surface` background, while the user's bubbles are outlined only to distinguish "internal" vs "external" voice.

### Dichotomy Cards
A unique component divided vertically. The left column (Internal/Control) uses a subtle `Soft Sage` tint; the right column (External/No Control) uses a subtle `Dusty Rose` tint. Use Inter (Label-LG) for headers.

### Breathing Rings
Non-interactive background elements used during meditation prompts. These are concentric circles with a 1px stroke, using a CSS "ping" animation to expand and fade slowly, timed to a 4-second inhale/6-second exhale rhythm.

### Inputs
The message input field should be a single line that expands vertically. It should have a 1.5rem (24px) corner radius to resemble a pill, with the `Surface` background and an off-white placeholder text at 50% opacity.

### Iconography
Icons should be abstract and line-based. Incorporate marble-texture masks or SVG patterns within large icons (like a stylized head of Marcus Aurelius) to evoke a sense of history and permanence.