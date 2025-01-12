import { Euler, Vector3 } from 'three'
import { create } from 'zustand'

type Store = {
    gunPosition:Vector3
    gunRotation:Euler
    scale:unknown
}

export const useStore = create<Store>()((set) => ({
  gunPosition:new Vector3(0, 0, 0),
  gunRotation:new Euler(0, Math.PI, 0),
  scale:''
}))

