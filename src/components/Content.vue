<template>
  <div class="content">

    <div class="filter-row row">
      <div class="filter-box col-0 col-md-4"></div>

      <div class="filter-box title-box col-12 col-sm-6 col-md-4">
        <h1>{{ mainTitle }}</h1>
      </div>

      <div class="filter-box col-12 col-sm-6 col-md-4">
        <div class="filters-menu">
          <div @click="isColourFilters = !isColourFilters"
              :class="{ active: isColourFilters }">
            Colour
          </div>
          <div @click="isShapeFilters = !isShapeFilters"
              :class="{ active: isShapeFilters }">
            Shape
          </div>
        </div>
      </div>
    </div>

    <div class="filter-items row" :class="{ active: isColourFilters }">
      <div class="col" @click="addColourFilter('black')" data-color="black">
        <span class="colour-hover">
          <span class="colour-preview" style="background:#000"></span>
        </span>
        Black
      </div>

      <div class="col" @click="addColourFilter('tortoise')" data-color="tortoise">
        <span class="colour-hover">
          <span class="colour-preview tortoise"></span>
        </span>
        Tortoise
      </div>

      <div class="col" @click="addColourFilter('coloured')" data-color="coloured">
        <span class="colour-hover">
          <span class="colour-preview coloured"></span>
        </span>
        Coloured
      </div>

      <div class="col" @click="addColourFilter('crystal')" data-color="crystal">
        <span class="colour-hover">
          <span class="colour-preview" style="background:#ebecf1"></span>
        </span>
        Crystal
      </div>

      <div class="col" @click="addColourFilter('dark')" data-color="dark">
        <span class="colour-hover">
          <span class="colour-preview" style="background:#622932"></span>
        </span>
        Dark
      </div>

      <div class="col" @click="addColourFilter('bright')" data-color="bright">
        <span class=colour-hover>
          <span class="colour-preview" style="background:#d68c36"></span>
        </span>
        Bright
      </div>
    </div>

    <div class="filter-items shape row" :class="{ active: isShapeFilters }">
      <div class="col" @click="addShapeFilter('square')" data-shape="square">
        Square
      </div>

      <div class="col" @click="addShapeFilter('rectangle')" data-shape="rectangle">
        Rectangle
      </div>

      <div class="col" @click="addShapeFilter('round')" data-shape="round">
        Round
      </div>

      <div class="col" @click="addShapeFilter('cat-Eye')" data-shape="cat-Eye">
        Cat-Eye
      </div>
    </div>

    <!-- Items -->
    <div id="collectionBox" class="collection-items"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="infinityScrollDisabled"
         infinite-scroll-distance="80">
    </div>

    <!-- Loader -->
    <div class="loader-box" :class="{ 'd-none': hideLoader }">
      <div class="loader"></div>
    </div>

    <!-- No results -->
    <div class="no-results pt-4 text-center" :class="{ 'd-none': noResults }">
      No results, please change your filters
    </div>

  </div>
</template>

<script>
let collectionURL = 'https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections',
  apiURL = "https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/",
  dataURL = "";

export default {
  name: "Content",
  data() {
    return {
      mainTitle: "Spectacles Women",
      isColourFilters: false,
      isShapeFilters: false,
      hideLoader: true,
      noResults: true,
      loadMoreStatus: false,
      infinityScrollDisabled: true
    };
  },
  created: function() {
    sessionStorage.clear();
    sessionStorage.setItem("pageNumber", 1);
    this.getCollection();
  },
  methods: {
    getCollection: function() {
      fetch(collectionURL)
        .then(response => {
          response.json().then(json => {
            this.setCollection(json.collections);
          });
        })
    },
    setCollection: function(data) {
      let currentURL = window.location.pathname.split("/"),
        currentCollection = currentURL[currentURL.length - 1],
        colourParams = new URLSearchParams(window.location.search).get('colour'),
        shapeParams = new URLSearchParams(window.location.search).get('shape'),
        convertedParams = "?sort[type]=collection_relations_position&sort[order]=asc&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic&filters[frame_variant_home_trial_available]=false&page[limit]=12";

      // Get the page number for infinite scrolling
      convertedParams += `&page[number]=${sessionStorage.getItem("pageNumber")}`;

      // If there are filters by color, then convert them and add them to the url
      if (colourParams) {
        let param = colourParams.split("~");
        sessionStorage.setItem("colour", colourParams);

        for (let i = 1; i < param.length; i++) {
          convertedParams += `&filters[glass_variant_frame_variant_colour_tag_configuration_names][]=${param[i]}`;
          document.querySelector(`[data-color=${param[i]}]`).classList.add("active");
        }
      }

      // If there are filters by shape, then we convert them and add them to the url
      if (shapeParams) {
        let param = shapeParams.split("~");
        sessionStorage.setItem("shape", shapeParams);

        for (let i = 1; i < param.length; i++) {
          convertedParams += `&filters[glass_variant_frame_variant_frame_tag_configuration_names][]=${param[i]}`;
          document.querySelector(`[data-shape=${param[i]}]`).classList.add("active");
        }
      }

      // Show loader if this is the first request
      this.noResults = true;
      if (!this.loadMoreStatus) this.hideLoader = false;

      // Select collection based on page url and add url to global variable
      for (let i = 0; i < data.length; i++) {
        if (currentCollection === data[i].configuration_name) {
          this.mainTitle = data[i].name;
          dataURL = `${apiURL}${data[i].configuration_name}/glasses${convertedParams}`;
          this.getItem();
        }
      }
    },

    getItem: function() {
      fetch(dataURL)
        .then(response => {
          response.json().then(json => {
            this.showItem(json.glasses);
          });
        })
    },

    showItem: function(json) {
      let collectionBox = document.getElementById("collectionBox");

      // If the filters are changed, then delete old Items
      if (!this.loadMoreStatus) collectionBox.innerHTML = "";

      /* console.log(json); */

      // If there are no results, then show the text "No results",
      // else plus 1 to the page number for the next load
      if (json.length == 0) {
        if (!this.loadMoreStatus) this.noResults = false;
      } else {
        if (this.loadMoreStatus) {
          sessionStorage.setItem("pageNumber", Number(sessionStorage.getItem("pageNumber")) + 1);
        }
      }

      // Hide the loader
      this.hideLoader = true;

      // Loop through each Item and add it to the DOM
      for (let i = 0; i < json.length; i++) {
        let itemName = json[i].name,
          itemImage = json[i].glass_variants[0].media[0].url,

          itemTemplate = `
            <div class="item col-12 col-sm-6 col-md-4">
              <span class="title">${itemName}</span>
              <img src="${itemImage}" alt=">${itemName}">
            </div>`;

        collectionBox.innerHTML += itemTemplate;
      }

      // If there are 12 items and this is the first load, then unlock infinityScroll
      if (!this.loadMoreStatus && json.length == 12) {
        this.infinityScrollDisabled = false;
      }

      // If the result is less than 12 and loadMore is active, then disable infinityScroll
      if (12 > json.length && this.loadMoreStatus) {
        this.infinityScrollDisabled = true;
      }

      this.loadMoreStatus = false;
    },

    addColourFilter: function(colour) {
      let queryArr = this.$route.query,
        checkColourSession = sessionStorage.getItem("colour"),
        colourValue = "", newParams = "";

      if (sessionStorage.getItem("colour")) {
        colourValue = sessionStorage.getItem("colour");
      }

      // If this color is already in the filter, then delete it after the double click,
      // else add the color to the filter and to the url
      if (checkColourSession && checkColourSession.includes(colour)) {
        let removedFilter = colourValue.replaceAll(`~${colour}`, '');
        newParams = { ...queryArr, 'colour': `${removedFilter}` };
        sessionStorage.setItem("colour", `${removedFilter}`);
        document.querySelector(`[data-color="${colour}"]`).classList.remove("active");
      } else {
        newParams = { ...queryArr, 'colour': `${colourValue}~${colour}` };
        sessionStorage.setItem("colour", `${colourValue}~${colour}`);
      }

      // Reset the page number when changing the filter
      sessionStorage.setItem("pageNumber", 1);

      this.$router.push({ query: newParams }).catch(err => {});
      this.getCollection();
    },

    addShapeFilter: function(shape) {
      let queryArr = this.$route.query,
        checkShapeSession = sessionStorage.getItem("shape"),
        shapeValue = "", newParams = "";

      if (sessionStorage.getItem("shape")) {
        shapeValue = sessionStorage.getItem("shape");
      }

      // If this shape is already in the filter, then delete it after the double click,
      // else add the shape to the filter and to the url
      if (checkShapeSession && checkShapeSession.includes(shape)) {
        let removedFilter = shapeValue.replaceAll(`~${shape}`, '');
        newParams = { ...queryArr, 'shape': `${removedFilter}` };
        sessionStorage.setItem("shape", `${removedFilter}`);
        document.querySelector(`[data-shape="${shape}"]`).classList.remove("active");
      } else {
        newParams = { ...queryArr, 'shape': `${shapeValue}~${shape}` };
        sessionStorage.setItem("shape", `${shapeValue}~${shape}`);
      }

      // Reset the page number when changing the filter
      sessionStorage.setItem("pageNumber", 1);

      this.$router.push({ query: newParams }).catch(err => {});
      this.getCollection();
    },

    loadMore: function() {
      if (!this.loadMoreStatus) {
        // Change the loading status to true to display the new 12 items without deleting the old ones
        this.loadMoreStatus = true;

        // Requesting a new collection
        this.getCollection();
      }
    }

  }
};
</script>
