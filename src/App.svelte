<script>
  import { onMount } from 'svelte'

  let location = {
    name: 'Chicago, Illonois',
    lat: 41.9482,
    lng: -87.6564,
  }
  let daily = [1, 2, 3, 4, 5]

  async function fetchData() {
    const response = await fetch(
      `/api/weather?lat=${location.lat}&lng=${location.lng}`
    )
    const data = await response.json()
    console.log(data)
  }

  onMount(() => {
    fetchData()
  })
</script>

<main class="flex justify-center pt-8">
  <div class="mb-8 text-white">
    <input
      id="search"
      type="text"
      class="form-input block w-full text-gray-800"
    />
    <div
      class="mt-4 w-128 max-w-lg font-sans overflow-hidden bg-gray-900
      rounded-lg shadow-lg"
    >
      <div class="flex items-center justify-between px-6 py-8">
        <div class="flex items-center">
          <div>
            <div class="text-6xl font-semibold">8°C</div>
            <div>Feels like 2°C</div>
          </div>
          <div class="mx-5">
            <div class="font-semibold">Cloudy</div>
            <div>Toronto, Canada</div>
          </div>
        </div>
        <div>ICON</div>
      </div>

      <div class="text-sm bg-gray-800 overflow-hidden">
        {#each daily as item, index}
          <div
            class="flex items-center px-6 py-4"
            class:bg-gray-700={index % 2}
          >
            <div class="w-1/6 text-lg text-gray-200">DOW : {item}</div>
            <div class="flex items-center w-2/3 px-4">
              <div>ICON</div>
              <div class="ml-3">Cloudy with a chance of showers</div>
            </div>
            <div class="w-1/6 text-right">
              <div>5°C</div>
              <div>-2°C</div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>
