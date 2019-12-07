let selectedObject = null;

export const selectMesh = mesh => ({
  type: "SELECT_MESH",
  mesh: mesh
});

export const deselectMesh = () => ({
  type: "DESELECT_MESH"
});

export const setState = state_id => ({
  type: "SET_STATE"
});
