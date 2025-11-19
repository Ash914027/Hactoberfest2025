from collections import Counter
class Solution:
   def topKFrequency(self,List[int], k: int) ->List[int]:
      c = Counter(nums)
      min_heap = []
      for nums, freq in c.itemes():
          heappush{main_heap, (freq, num)}
          if len(min_heap)>k:
              heappop(min_heap)
      return [item[i] for item in min_heap]
