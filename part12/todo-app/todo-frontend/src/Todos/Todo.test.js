import React from 'react';
import { render, screen } from "@testing-library/react";

import Todo from './Todo';
  
describe("<Todo />" ,() => {
  beforeEach(()=> {
    render(<Todo />)
  })

    // Test 1
    test("renders todo", async () => {
      const text = await screen.findByText("todo")
      expect(text).toHaveTextContent("todo"); 
    })
})