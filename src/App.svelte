<script>
  import { onMount, tick } from 'svelte'

  let skycons

  let currentTemp = {
    actual: '',
    feels: '',
    summary: '',
    icon: '',
  }

  let location = {
    name: 'Chicago, Illonois',
    lat: 41.9482,
    lng: -87.6564,
  }
  let daily = []

  function initializeSkycons() {
    skycons = new Skycons({ color: 'white' })
  }

  function hyphenate(str) {
    return str.split(' ').join('-')
  }

  function convertToDay(unix) {
    const newDate = new Date(unix * 1000)
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    return days[newDate.getDay()]
  }

  async function fetchData() {
    const response = await fetch(
      `/api/weather?lat=${location.lat}&lng=${location.lng}`
    )
    const data = await response.json()

    const { temperature, apparentTemperature, summary, icon } = data.currently
    currentTemp.actual = Math.round(temperature)
    currentTemp.feels = Math.round(apparentTemperature)
    currentTemp.summary = summary
    currentTemp.icon = hyphenate(icon)

    daily = data.daily.data.filter((day, index) => index < 5)

    skycons.add('iconCurrent', currentTemp.icon)
    await tick()

    daily.forEach((day, index) => {
      const iconID = `icon-week-${index + 1}`
      skycons.add(
        iconID,
        document.getElementById(iconID).getAttribute('data-icon')
      )
    })
    skycons.play()
  }

  onMount(() => {
    fetchData()
  })
</script>

<svelte:head>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/skycons/1396634940/skycons.min.js"
    on:load={initializeSkycons}>

  </script>
</svelte:head>

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
            <div class="text-6xl font-semibold">{currentTemp.actual}°C</div>
            <div>Feels like {currentTemp.feels}°C</div>
          </div>
          <div class="mx-5">
            <div class="font-semibold">{currentTemp.summary}</div>
            <div>{location.name}</div>
          </div>
        </div>
        <div>
          <canvas id="iconCurrent" width="96" height="96" />
        </div>
      </div>

      <div class="text-sm bg-gray-800 overflow-hidden">
        {#each daily as { time, icon, summary, temperatureHigh, temperatureLow }, index (time)}
          <div
            class="flex items-center px-6 py-4"
            class:bg-gray-700={index % 2}
          >
            <div class="w-1/6 text-lg text-gray-200">{convertToDay(time)}</div>
            <div class="flex items-center w-2/3 px-4">
              <div>
                <canvas
                  id={`icon-week-${index + 1}`}
                  data-icon={hyphenate(icon)}
                  width="24"
                  height="24"
                />
              </div>
              <div class="ml-3">{summary}</div>
            </div>
            <div class="w-1/6 text-right">
              <div>{Math.round(temperatureHigh)}°C</div>
              <div>{Math.round(temperatureLow)}°C</div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>
