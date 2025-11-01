import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import HorseList from "../HorseList.vue";

describe("HorseList Component", () => {
  let store;

  beforeEach(() => {
    store = createStore({
      modules: {
        horses: {
          namespaced: true,
          state: {
            allHorses: [
              { id: 1, name: "Thunder", color: "#FF6B6B", condition: 85 },
              { id: 2, name: "Lightning", color: "#4ECDC4", condition: 90 },
              { id: 3, name: "Storm", color: "#45B7D1", condition: 75 },
            ],
          },
          getters: {
            getAllHorses: (state) => state.allHorses,
          },
        },
      },
    });
  });

  it("should render horse list container", () => {
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find(".horse-list-container").exists()).toBe(true);
  });

  it("should display section title with horse count", () => {
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    const title = wrapper.find(".section-title");
    expect(title.text()).toContain("Available Horses");
    expect(title.text()).toContain("3");
  });

  it("should render all horses", () => {
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    const horseItems = wrapper.findAll(".horse-item");
    expect(horseItems).toHaveLength(3);
  });

  it("should display horse name", () => {
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    const horseName = wrapper.find(".horse-name");
    expect(horseName.text()).toBe("Thunder");
  });

  it("should display horse color", () => {
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    const horseColor = wrapper.find(".horse-color");
    expect(horseColor.attributes("style")).toContain(
      "background-color: rgb(255, 107, 107)"
    );
  });

  it("should display horse condition", () => {
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    const conditionValue = wrapper.find(".condition-value");
    expect(conditionValue.text()).toBe("85");
  });

  it("should display condition bar with correct width", () => {
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    const conditionFill = wrapper.find(".condition-fill");
    expect(conditionFill.attributes("style")).toContain("width: 85%");
  });
});
