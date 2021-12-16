<template>
    <div class="app">
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../SassTheme.scss";

.app {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: $background_solidBackground_base;

    .content {
        width: 100%;
        height: 100%;
    }
}
</style>
