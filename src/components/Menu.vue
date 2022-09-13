<template>
  <div class="bloobloom-side-menu" @mouseenter="showMenu" @mouseleave="hideMenu" :data-hover="hover">

    <div class="menu-list">
      <div class="menu-tab" @mouseenter="isSunglassesActive = false;isSpectaglesActive = !isSpectaglesActive">
        <span>Spectagles</span>
        <svg width="11" height="16" viewBox="0 0 11 16" fill="none" class="sidemenu-tab-icon"><path d="M1 1L9 8.2L1 15.4" stroke="black" stroke-opacity="0.85" stroke-width="1.5"></path></svg>
      </div>

      <div class="menu-tab" @mouseenter="isSpectaglesActive = false;isSunglassesActive = !isSunglassesActive">
        <span>Sunglasses</span>
        <svg width="11" height="16" viewBox="0 0 11 16" fill="none" class="sidemenu-tab-icon"><path d="M1 1L9 8.2L1 15.4" stroke="black" stroke-opacity="0.85" stroke-width="1.5"></path></svg>
      </div>

      <a href="/" class="menu-tab">
        <span>Home Try On</span>
      </a>

      <a href="/" class="menu-tab">
        <span>Paid for pair</span>
      </a>
    </div>

    <div class="sub-menu" :class="{ active: isSpectaglesActive }" @mouseenter="submenuFocus" @mouseleave="hideAllSubmenu">
      <div class="menu-tab go-back" @click="hideAllSubmenu">
        <span>&lt;</span>
        <span>Go Back</span>
      </div>

      <a href="/collections/spectacles-women" class="menu-tab">
        <span>Women</span>
      </a>

      <a href="/collections/spectacles-men" class="menu-tab">
        <span>Men</span>
      </a>
    </div>

    <div class="sub-menu" :class="{ active: isSunglassesActive }" @mouseenter="submenuFocus" @mouseleave="hideAllSubmenu">
      <div class="menu-tab go-back" @click="hideAllSubmenu">
        <span>&lt;</span>
        <span>Go Back</span>
      </div>

      <a href="/collections/sunglasses-women" class="menu-tab">
        <span>Women</span>
      </a>

      <a href="/collections/sunglasses-men" class="menu-tab">
        <span>Men</span>
      </a>
    </div>

  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      hover: 'no',
      isSpectaglesActive: false,
      isSunglassesActive: false,
      submenuHover: false,
    };
  },
  methods: {
    showMenu: function() {
      this.hover = "yes";
    },
    hideMenu: function() {
      const btnMenu = document.querySelector(".bloobloom-header-button");
      this.hover = "no";

      // Using setTimeout to delay code execution in the event loop
      setTimeout(() => {
        if (btnMenu.dataset.hover === "no") {
          document.querySelector(".bloobloom-side-menu").classList.remove("open");
          btnMenu.classList.remove("active");
        }
      }, 0);
    },

    submenuFocus: function() {
      this.submenuHover = true;
    },

    // Hide all submenu and reset hover
    hideAllSubmenu: function() {
      if (this.submenuHover) {
        this.isSpectaglesActive = false;
        this.isSunglassesActive = false;
        this.submenuHover = false;
      }
    }
  },
};
</script>
