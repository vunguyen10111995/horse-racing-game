import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import ControlPanel from "../ControlPanel.vue";

describe("ControlPanel Component", () => {
  let store;

  beforeEach(() => {
    store = createStore({
      modules: {
        game: {
          namespaced: true,
          state: {
            gameStatus: "idle",
            isGenerating: false,
            isRacing: false,
          },
          getters: {
            canGenerate: () => true,
            canStart: () => false,
            isGenerating: (state) => state.isGenerating,
            isRacing: (state) => state.isRacing,
            getGameStatus: (state) => state.gameStatus,
          },
          actions: {
            generateRaceSchedule: vi.fn(),
            startRacing: vi.fn(),
          },
        },
      },
    });
  });

  it("should render control panel", () => {
    const wrapper = mount(ControlPanel, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find(".control-panel").exists()).toBe(true);
  });

  it("should render generate button", () => {
    const wrapper = mount(ControlPanel, {
      global: {
        plugins: [store],
      },
    });

    const generateBtn = wrapper.find(".btn-generate");
    expect(generateBtn.exists()).toBe(true);
    expect(generateBtn.text()).toContain("Generate Schedule");
  });

  it("should render start button", () => {
    const wrapper = mount(ControlPanel, {
      global: {
        plugins: [store],
      },
    });

    const startBtn = wrapper.find(".btn-start");
    expect(startBtn.exists()).toBe(true);
    expect(startBtn.text()).toContain("Start Race");
  });

  it("should dispatch generateRaceSchedule when generate button clicked", async () => {
    const dispatchSpy = vi.spyOn(store, "dispatch");

    const wrapper = mount(ControlPanel, {
      global: {
        plugins: [store],
      },
    });

    const generateBtn = wrapper.find(".btn-generate");
    await generateBtn.trigger("click");

    expect(dispatchSpy).toHaveBeenCalledWith("game/generateRaceSchedule");
  });

  it("should disable start button when canStart is false", () => {
    const wrapper = mount(ControlPanel, {
      global: {
        plugins: [store],
      },
    });

    const startBtn = wrapper.find(".btn-start");
    expect(startBtn.attributes("disabled")).toBeDefined();
  });

  it("should show status indicator", () => {
    const wrapper = mount(ControlPanel, {
      global: {
        plugins: [store],
      },
    });

    const statusIndicator = wrapper.find(".status-indicator");
    expect(statusIndicator.exists()).toBe(true);
  });

  it("should display correct status text", () => {
    const wrapper = mount(ControlPanel, {
      global: {
        plugins: [store],
      },
    });

    const statusValue = wrapper.find(".status-value");
    expect(statusValue.text()).toBe("Ready to Generate");
  });
});
