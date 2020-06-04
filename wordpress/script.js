document.getElementById('track-button').onclick = track;

const search = window.location.search;
 console.log(search);
if (search.includes('orderId')) {
  
  const orderId = search.split('orderId=')[1];
console.log('orderId: ', orderId);
  track(orderId);
}

function populate(id, value) {
  const el = document.getElementById(id);
  el.innerText = value;
}

function show(id) {
  const el = document.getElementById(id);
  el.style.display = 'inherit';
}

function populateContainer(arr, containerId) {
  const containerEl = document.getElementById(containerId);
  const divider = document.createElement('div');
  divider.style.height = '1px';
  divider.style.background = 'lightgray';
  containerEl.appendChild(divider);

  for (let i = 0; i < arr.length; i++) {
    const tag = document.createElement('p');
    tag.innerText = arr[i].title;
    tag.style.marginTop = 5;
    tag.style.marginBottom = 0;
    const dateEl = document.createElement('span');
    dateEl.innerText = `${new Date(arr[i].date).toLocaleString()} - `;

    tag.prepend(dateEl);

    containerEl.appendChild(tag);
  }
}

async function track(pathOrderId) {
  const inputEl = document.getElementById('tracking_number_input');
  let orderId = '';
  if (pathOrderId) {
    inputEl.value = pathOrderId;
    orderId = pathOrderId;
  } else {
    const { value } = inputEl;
    orderId = value;
  }
  console.log('tracking number: ', orderId);
  try {
    const url =
      'https://ffk0qmohvb.execute-api.us-east-2.amazonaws.com/production/track';
    const response = await axios.post(url, { orderId });
    const { data } = response;
    const { destination, last_status, checkpoints } = data;
    console.log('data: ', data);
    populate('destination', destination);
    populate('status', last_status);
    show('destination_parent');
    show('status_parent');
    populateContainer(checkpoints, 'checkpoints');
  } catch (e) {
    console.log('Error getting info: ', e);
  }
}

