import React from 'react'
import ListsTab from './ListsTab'
import { fetchCurrentUserLikeIds, fetchLikedMembers } from '../actions/likeActions'

export default async function Listspage({searchParams}: {searchParams: {type: string}}) {

  const {type} = await searchParams;
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(type);

  return (
    <div>
      <ListsTab members={members} likeIds={likeIds} />
    </div>
  )
}
