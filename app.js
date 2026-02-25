const services = [
  { id: "mail", name: "Correo", url: "https://mail.google.com" },
  { id: "calendar", name: "Calendario", url: "https://calendar.google.com" },
  { id: "drive", name: "Drive", url: "https://drive.google.com" },
  { id: "chat", name: "Chat", url: "https://chat.openai.com" }
];

const singleSelect = document.getElementById("single-service");
const pairASelect = document.getElementById("pair-a");
const pairBSelect = document.getElementById("pair-b");
const status = document.getElementById("status");

function createOption(service) {
  const option = document.createElement("option");
  option.value = service.id;
  option.textContent = service.name;
  return option;
}

function fillSelectors() {
  const selectors = [singleSelect, pairASelect, pairBSelect];

  selectors.forEach((selector) => {
    services.forEach((service) => selector.appendChild(createOption(service)));
  });

  pairBSelect.selectedIndex = 1;
}

function findServiceById(serviceId) {
  return services.find((service) => service.id === serviceId);
}

function openService(service) {
  window.open(service.url, "_blank", "noopener,noreferrer");
}

function showStatus(message, type) {
  status.className = type;
  status.textContent = message;
}

document.getElementById("open-single").addEventListener("click", () => {
  const service = findServiceById(singleSelect.value);
  if (!service) {
    showStatus("No se encontró el servicio seleccionado.", "warn");
    return;
  }

  openService(service);
  showStatus(`Abriendo ${service.name}...`, "ok");
});

document.getElementById("open-pair").addEventListener("click", () => {
  const first = findServiceById(pairASelect.value);
  const second = findServiceById(pairBSelect.value);

  if (!first || !second) {
    showStatus("Selecciona dos servicios válidos.", "warn");
    return;
  }

  if (first.id === second.id) {
    showStatus("Elige dos servicios diferentes para abrir un par.", "warn");
    return;
  }

  [first, second].forEach(openService);
  showStatus(`Abriendo ${first.name} y ${second.name}...`, "ok");
});

fillSelectors();
